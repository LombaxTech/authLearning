const passport = require('passport')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

function initializePassport(getUserByEmail) {

    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'no user of that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: `incorrect password` });
            }

        } catch (err) {
            return done(err);
        }
    }

    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            authenticateUser
        )
    )

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => {
        done(null, User.findById(id))
    });

}

module.exports = initializePassport;