const clientCtrl = require('./client.server.controller')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/client', passport.authenticate('jwt', {session: false}), clientCtrl.save);
    app.get('/api/client', passport.authenticate('jwt', {session: false}), clientCtrl.getData);
}