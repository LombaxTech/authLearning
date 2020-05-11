const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
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

// * Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// * Route middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('started listening'));