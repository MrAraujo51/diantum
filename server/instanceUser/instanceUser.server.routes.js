const instanceUserCtrl = require('./instanceUser.server.controller')
const passport  = require('passport');

module.exports = (app) => {
    app.post('/api/instance/register', passport.authenticate('jwt', {session: false}), instanceUserCtrl.create);
    app.post('/api/instance/change-rol', passport.authenticate('jwt', {session: false}), instanceUserCtrl.changeRol)
    app.get('/api/instance/suscriptions/:instance_id', instanceUserCtrl.getUsers )
}