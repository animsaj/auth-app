const Authentication = require('./controllers/auth');
const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function (app) {
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'Well... To see this message means you are AUTHENTICATED' });
    });
    app.post('/signup', Authentication.singUp);
    app.post('/signin', requireSignIn, Authentication.signIn);
}