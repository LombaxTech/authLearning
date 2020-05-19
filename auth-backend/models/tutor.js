const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    studentName: String,
    subject: String,
    time: Date
})

const tutorSchema = new Schema({
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
    subjects: [String],
    bookings: [bookingSchema],
    cancelledBookings: [bookingSchema],
    role: {
        type: Number,
        default: 1
    }
})

const tutor = mongoose.model('Tutor', tutorSchema);

module.exports = tutor;