const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

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
const userRoutes = require('./routes/user');

const studentAuthRoutes = require('./routes/studentAuth');
const tutorAuthRoutes = require('./routes/tutorAuth');

const messageRoutes = require('./routes/message');

// * Route middleware
app.use('/api', userRoutes);

app.use('/api/student', studentAuthRoutes);
app.use('/api/tutor', tutorAuthRoutes);
app.use('/api/message', messageRoutes);

io.on('connection', socket => {

    socket.on('join room', e => {
        socket.join(e);
    })

    socket.on('msg', e => {
        io.to(e.roomName).emit('message', e.message)
    })

});

const PORT = process.env.PORT || 8000;
server.listen(PORT, console.log('started listening'));