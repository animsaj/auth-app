const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.singUp = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    //see if the user with the given email exist
    if (!email || !password) {
        return res.status(422).send('You have to provide email and password');
    }
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }
        //if it exist throw an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email already in use' });
        }
        //if it doesn't create and save a user
        const user = new User({
            email: email,
            password: password
        });
        user.save(function (err, newUser) {
            if (err) { return next(err); }
            //respond to a request
            res.json({ token: tokenForUser(newUser) });
        });
    });
}

exports.signIn = function (req, res, next) {
    res.json({ token: tokenForUser(req.user) });
}