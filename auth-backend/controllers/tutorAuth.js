const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt')
const Tutor = require('../models/tutor');

exports.signup = async (req, res) => {
    try {
        let { email, name, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10)
        let tutor = new Tutor({
            email,
            name,
            password: hashedPassword
        });
        tutor = await tutor.save();
        res.json(tutor);
    } catch (error) {
        res.send(`error of: ${error}`);
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const tutor = await Tutor.findOne({ email });
        if (!tutor) return res.status(400).json({ error: 'tutor not found' });

        if (!(await bcrypt.compare(password, tutor.password))) {
            return res.send('email and password do not match');
        }

        const token = jwt.sign({ _id: tutor._id }, 'mySecretKey');
        res.cookie('testCookie', token, { expire: new Date() + 9999 });
        return res.json({
            token,
            tutor: { id: tutor._id, name: tutor.name, email: tutor.email, role: tutor.role }
        })
    } catch (error) {
        return res.send(`error of: ${error}`)
    }
}

exports.signout = (req, res) => {
    res.clearCookie('testCookie');
    return res.send('successfully signed out');
}

// makes it so you need token 
exports.requireSignin = expressJwt({
    secret: 'mySecretKey',
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let auth = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!auth) return res.status(403).json({ error: `access denied` });
    next();
}

exports.tutorById = async (req, res, next, id) => {
    try {
        let tutor = await Tutor.findById(id);
        if (!tutor) return res.status(400).json({ error: `no tutor` });
        req.profile = tutor;
        next();
    } catch (error) {
        return res.status(400).json({ error: `error of ${error}` });
    }
}

exports.isTutor = (req, res, next) => {
    if (req.profile.role === 0) return res.status(403).json({ error: 'tutors only' });
    next();
}