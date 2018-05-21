
const instanceCtrl = require('./instance.server.controller');
const passport  = require('passport');

module.exports = (app) => {
    
    // Get All instance for a specific user
    app.get('/api/instance', passport.authenticate('jwt', {session: false}), instanceCtrl.getInstances)
    //app.get('/instance/:instanceId', passport.authenticate('jwt', {session: false}),  instanceCtrl.getInstance)
    // Create a new instance
    app.post('/api/instance', instanceCtrl.create)
    //Save a new log
    app.post('/api/instance/save-log', passport.authenticate('jwt', {session: false}), instanceCtrl.saveLog)
    // Optain the parameters for a specific instance
    app.get('/api/instance/params/:id', passport.authenticate('jwt', {session: false}), instanceCtrl.getParams);
    // Change the parameters for a specific instance
    app.post('/api/instance/params/:id', passport.authenticate('jwt', {session: false}), instanceCtrl.changeParams);
    
    //app.put('/instance/:instanceId', passport.authenticate('jwt', {session: false}), instanceCtrl.updateInstance)
    //app.delete('/instance/:instanceId', instanceCtrl.deleteInstance)
}