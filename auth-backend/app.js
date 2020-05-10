const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const session = require('express-session');

const passport = require('passport');
const initializePassport = require('./config/passportConfiguration');
initializePassport();

const app = express();

mongoose.connect('mongodb://authUser:authPass123@ds045948.mlab.com:45948/auth_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err))

// * Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// * Routes
const authRoutes = require('./routes/auth');

// * Route middleware
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('started listening'));