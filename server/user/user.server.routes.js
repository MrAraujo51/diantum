
const passport  = require('passport');
const user  = require('./user.server.controller');

module.exports = (app) => {
    // API Server Endpoints

    /* ==============
      Register Route
    ============== */

    app.post('/api/user/register', user.saveUser);

    /* ============================================================
        Route to check if user's email is available for registration
    ============================================================ */
    app.get('/api/user/checkEmail/:email', user.checkEmail);

    /* ============================================================
        Route to check if user's username is available for registration
    ============================================================ */
    app.get('/api/user/checkUsername/:username', user.checkUsername);

    app.put('/api/user/update/:userId', user.updateUser)

    // Authenticate
    app.post('/api/user/authenticate', user.authenticate);

    //router.post('/forgot', user.forgotPassword);
    app.post('/api/user/reset', user.newPassword);
    app.post('/api/user/verify', user.verifyEmail);

    // Profile
    app.get('/api/user/profile', passport.authenticate('jwt', {session: false}) , user.getProfile);

}
