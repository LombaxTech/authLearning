const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');

router.get('/', (req, res) => {
    res.send('auth routes')
})

router.post('/register', async (req, res) => {
    try {
        let { email, name, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            email,
            name,
            password: hashedPassword
        });
        user = await user.save();
        res.send(`user has been saved: ${user}`);
    } catch (error) {
        res.send(`error of: ${error}`);
    }
})

router.get('/protected', checkAuthenticated, (req, res) => {
    res.send(`you have access to this auth route`);
});

router.get('/unprotected', checkNotAuthenticated, (req, res) => {
    res.send(`you have access to this this unauth route`);
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send('not authenticated');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.send(`you are already authenticated`)
    }
    next();
}

module.exports = router;