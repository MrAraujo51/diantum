const Client    = require('./client.server.model')

exports.save = (req, res) => {
    req.body.user_id = req.user._id
    Client.update({user_id: req.user._id}, req.body, (err, result) => {
        if(err) return res.json({ success: false, message: `Could not save client. Error: ${err}`})
        return res.status(201).json({ success: true, message: 'Data registred'})
    })
}

exports.getData = (req, res) => {
    Client.findOne({user_id: req.user._id}, (err, client) => {
        if(err) return res.json({ success: false, message: `Error en la base de datos: ${err}`});
        return res.status(200).json({ success: true, customer: client}); 
    })
}