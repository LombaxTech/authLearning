const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
// const bcrypt = require('bcrypt')
// const User = require('../models/user');

const { signup, signin, signout, requireSignin, isAuth, isTutor, userById } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.send('auth routes')
})

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/user/:userId', requireSignin, isAuth, isTutor, (req, res) => {
    // console.log(req.auth)
    res.send(`user found of: ${req.profile}`)
})

router.param('userId', userById)

module.exports = router;