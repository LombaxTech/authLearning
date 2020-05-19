const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    tutorName: String,
    subject: String,
    time: Date
})

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bookings: [bookingSchema],
    cancelledBookings: [bookingSchema],
    role: {
        type: Number,
        default: 0
    }
})

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;