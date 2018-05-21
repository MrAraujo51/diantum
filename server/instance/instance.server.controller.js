const Instance = require('./instance.server.model')
const InstanceUser = require('../instanceUser/instanceUser.server.model')
const Product = require('../product/product.server.model')

exports.create = (req, res) => {
    if (!req.body.name) return res.status(400).json({ success: false, message: 'Instace name is require' });
    if (!req.body.description) return res.status(400).json({ success: false, message: 'Instace description is require' });
    if (!req.body.iat) return res.status(400).json({ success: false, message: 'Instace iat is require' });
    if (!req.body.exp) return res.status(400).json({ success: false, message: 'Instace exp is require' });
    if (!req.body.code) return res.status(400).json({ success: false, message: 'Instace code is require' });
    if (!req.body.maxUser) return res.status(400).json({ success: false, message: 'Instace maxUser is require' });
    if (!req.body.image) return res.status(400).json({ success: false, message: 'Instace image is require' });
    
    var iat = new Date(req.body.iat);
    var exp = new Date(req.body.exp);

    Product.findOne({code: req.body.code}, (err, prod) => {
       if (err) res.status(500).json({success: false, message: `Error en la peticion ${err}`})
       

       let instance = new Instance({
            name: req.body.name,
            description: req.body.description,
            iat: iat,
            exp: exp,
            pin: req.body.pin,
            maxUser: req.body.maxUser,
            image: req.body.image,
            code: req.body.code,
            params: prod.defaultParameters
        })


        instance.save((err, result) => {
            if(err) return res.status(500).json({success: false, message: `Error al guardar en la base de datos ${err}` })
            res.status(201).json({ success: true, message: `Instance saved`})
        })
    })
   
}

exports.getInstances = (req, res) => {
    InstanceUser.find({user_id: req.user.id}, 'instance_id -_id rol', (err, userInstances) => {
        if(err) res.json({ success: false, message: `Error en el servidor` });
        if(!userInstances) res.json({ success: false, message: 'Gamificaciones no encontradas'});
        let aux = userInstances.map((userInstance) => { return userInstance.instance_id })
        Instance.find({ _id: { $in: aux}}).select('-pin').lean().exec((err, result) => {
            if(err) res.json({ success: false, message: `Error en el servidor` });
            if(!result) res.json({ success: false, message: 'Gamificaciones no encontradas'});
             result.forEach((data, index) => {
                userInstances.forEach((userInstance) => {
                    if(data._id.equals(userInstance.instance_id) ){
                        result[index]["rol"] = userInstance.rol;
                        return true;
                    }
                })
             })
            return res.status(200).json({ success: true, instances: result })
        });
    });
} 

exports.getParams = (req, res) => {
    if (!req.params.id) res.json({ success: false, message: 'Error en el servidor' }); // Return error message

    Instance.findById({_id: req.params.id}, '-_id params code', (err, params) => {
        if(err) res.json({ success: false, message: `Error en el servidor` });
        if(!params) res.json({ success: false, message: 'Error en el servidor'});
        res.status(200).json(params);
    })
}

exports.changeParams = (req, res) => {
    if (!req.params.id) res.json({ success: false, message: 'Error en el servidor.' }); // Return error message
    
    Instance.findById({_id: req.params.id}, (err, ins) => {
        if(err) res.json({ success: false, message: `Error en el servidor.` });
        if(!ins) res.json({ success: false, message: 'Gamificación no encontrada'});
        
        ins.params = req.body

        ins.save( (err) => {
            if(err) res.json({ success: false, message: `Error en el servidor.` });
            res.status(200).json({success: true, message: 'Parámetros guardados'})       
        })
    })
}

exports.saveLog = (req, res) => {
    if (!req.body.id) res.json({ success: false, message: 'Error en el servidor' }); // Return error message
    if (!req.body.log) res.json({ success: false, message: 'Error en el servidor' })

    Instance.findById({_id: req.body.id}, (err, ins) => {
        if(err) res.json({ success: false, message: `Error en el servidor.` });
        if(!ins) res.json({ success: false, message: 'Gamificación no encontrada'});
        let log = {
            username: req.user.username,
            date: Date.now(),
            result: req.body.log
        }
        ins.sess.push(log)

        ins.save((err) => {
            if(err) res.status(500).json({ success: false, message: `Error en el servidor.` });
            res.status(201).json({success: true, message: 'Resultados de la gamificación grabados'})
        })
    })
}