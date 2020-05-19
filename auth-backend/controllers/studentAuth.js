const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt')
const Student = require('../models/student');
const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        let { email, name, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10)
        let student = new Student({
            email,
            name,
            password: hashedPassword
        });
        student = await student.save();
        res.json(student);
    } catch (error) {
        res.send(`error of: ${error}`);
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ error: 'student not found' });

        if (!(await bcrypt.compare(password, student.password))) {
            return res.send('email and password do not match');
        }

        const token = jwt.sign({ _id: student._id }, 'mySecretKey');
        res.cookie('testCookie', token, { expire: new Date() + 9999 });
        return res.json({
            token,
            student: { id: student._id, name: student.name, email: student.email }
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

exports.studentById = async (req, res, next, id) => {
    try {
        let student = await Student.findById(id);
        if (!student) return res.status(400).json({ error: `no student` });
        req.profile = student;
        next();
    } catch (error) {
        return res.status(400).json({ error: `error of ${error}` });
    }
}

exports.isTutor = (req, res, next) => {
    if (req.profile.role === 0) return res.status(403).json({ error: 'tutors only' });
    next();
}