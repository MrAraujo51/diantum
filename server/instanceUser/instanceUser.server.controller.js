const InstanceUser = require('./instanceUser.server.model');
const Instance = require('../instance/instance.server.model');
const Product = require('../product/product.server.model')
const mysql = require('mysql');
const mysqlCtrl = require('../../private_modules/mysql')

exports.create = (req, res) => {
    if (!req.body.instance_token) return res.json({success: false, message: 'Debe introducir un código de acceso'})
    Instance.findOne({token: req.body.instance_token.toUpperCase()}, '-pin', (err, instance) => {
        if(err) return res.json({success: false, message: `Error en el servidor`});
        if(!instance) return createWithSQL(req, res);
        if(instance.exp < Date.now()) return res.json({ success: false, message: 'Vigencia de la instacia terminada' })
        if( instance.usersActive == instance.maxUser) return res.json({ success: false, message: 'Ha superado el número máximo de usuarios de esta instancia' });
        InstanceUser.findOne({user_id: req.user.id, instance_id: instance._id}, (err, result) => {
            if(err) return res.json({success: false, message: `Error en el servidor`});
            if(result) return res.json({ success: false, message: 'Código de acceso ya introducido' });
            let instanceUser = new InstanceUser({
                user_id: req.user.id,
                instance_id: instance._id
            })

            instanceUser.save((err, result) => {
                if(err) return res.json({success: false, message: `Error en el servidor` })
                instance.usersActive++;
                instance.save ( (err) => {
                    if (err) return res.json({ success: false, message: `Error en el servidor` });        
                    res.status(201).json({ success: true, message:'Ahora tienes acceso a la gamificación', instance: instance});
                })
            });
        })     
    })
}

exports.changeRol = (req, res) => {
    if(!req.body.instance_id) return res.json({ success: false, message: 'Error en el servidor'})
    if(!req.body.pin) return res.json({ success: false, message: 'Debe introducir un PIN'});
    InstanceUser.findOne({user_id: req.user.id, instance_id: req.body.instance_id}, (err, result) => {
        if(err) return res.json({ success: false, message: `Error en el servidor`});
        if(!result) return res.json({ success: false, message: 'Gamificación no encontrada'});
        Instance.findOne({_id: req.body.instance_id}, 'pin', (err, instance) => {
            if(err) return res.json({ success: false, message: `Error en el servidor`});
            if(!instance) return res.json({ success: false, message: 'Gamificación no encontrada'});
            if(instance.pin === req.body.pin) {
                    
                result.rol = "admin";
                    
                result.save((err, result) => {
                    if(err) return res.json({success: false, message: `Error en el servidor` })
                    res.status(201).json({ success: true, message:'Ahora eres administrador' });
                })
            } else {
                return res.json({ success: false, message: 'PIN erroneo'});
            }
        })  
    })

}

exports.getUsers = (req, res) => {
    if(!req.params.instance_id) return res.json({ success: false, message: 'Error en el servidor'});
    InstanceUser.
        find({instance_id: req.params.instance_id}).
        populate({
            path: 'user_id',
            select: 'username -_id',
        }).
        select('-_id user_id').
        exec((err, users) => {
            if(err) res.json({ success: false, message: `Error en el servidor` });
            if(!users) res.json({ success: false, message: 'Gamificación no encontrada'});
            
            users = users.map((user) => { return user.user_id.username });       
            return res.json({success: true, users: users});
        })
}

createWithSQL = (req, res) => {
    token = req.body.instance_token.toUpperCase()
    var sql = `SELECT s.serial_id, s.serial_data, s.serial_order_id, s.serial_order_product_id, op.order_product_id, op.order_id, o.description, o.start_date, o.time_zone_gamification,
                    p.product_name, p.product_code
                FROM
                dnt3_hikaserial_serial s
                INNER JOIN dnt3_hikashop_order_product op ON s.serial_order_id = op.order_id AND (s.serial_order_product_id = op.order_product_id)
                INNER JOIN dnt3_hikashop_order o ON op.order_id = o.order_id
                INNER JOIN dnt3_hikashop_product p ON op.product_id = p.product_id 
                WHERE s.serial_data = ${mysql.escape(token)}
                `
    mysqlCtrl.query(sql, (err, result) => {
        if (err) return res.json({ success: false, message: `Error en el servidor`}); //Return connction error 
        if (!result[0]) return res.json({ success: false, message: `Gamificación no encontrada`}); //Return error when not found token
        let d = result[0].start_date.toString()
        let tz = result[0].time_zone_gamification ? result[0].time_zone_gamification : 0
        let iat = new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)} 00:00:00 GMT${tz >= 0 ? '+'+tz : tz}00`)
        let exp = new Date(iat)
        exp.setDate(exp.getDate() + Number(result[0].product_code.split('_')[2]))
        let instance = new Instance({
            description: result[0].description,
            iat: iat,
            exp: exp,
            maxUser: Number(result[0].product_code.split('_')[1]),
            code: Number(result[0].product_code.split('_')[0]) % 2 ? Number(result[0].product_code.split('_')[0]) : Number(result[0].product_code.split('_')[0]) -1,
            token: token
        });
        var sql = ` SELECT s.serial_data
                    FROM
                    dnt3_hikaserial_serial s
                    WHERE s.serial_order_id = ${mysql.escape(result[0].serial_order_id)} AND s.serial_order_product_id = ${ mysql.escape(result[0].serial_order_product_id)}
                    `
        mysqlCtrl.query(sql, (err, result) => {
            if (err) return res.json({ success: false, message: `Error en el servidor`}); //Return connction error 
            if (!result[0]) return res.json({ success: false, message: `Gamificación no encontrada`}); //Return error when not found token
            instance.pin = result[1].serial_data.lenght == 6 ? result[1].serial_data : result[0].serial_data
            Product.findOne({code: instance.code}, (err, prod) => {
                if (err) return res.json({ success: false, message: `Error en el servidor`}); //Return connction error 
                instance.name = prod.title;
                instance.params = prod.defaultParameters;
                instance.image = prod.image
            
                instance.save((err, result) => {
            
                    if (err) res.json({success: false, message: `Error en el servidor`})
                    this.create(req, res)
                })
            })
        })
    })
}