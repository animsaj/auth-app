const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define schema
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//encrypt password on 'save' hook
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }
            user.password = hash;
            next();
        })
    })
});

userSchema.methods.verifyPassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
}

// create model
const User = mongoose.model('user', userSchema);

//export model
module.exports = User;