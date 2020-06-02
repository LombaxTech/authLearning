const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    tutorName: String,
    subject: String,
    time: Date
})

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: String
}, { timestamps: false });

const inboxSchema = new Schema({
    partnerName: {
        type: String,
        required: true
    },
    partnerId: {
        type: String,
        required: true
    },
    messages: [messageSchema]
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
    inbox: [inboxSchema],
    cancelledBookings: [bookingSchema],
    role: {
        type: Number,
        default: 0
    }
})

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;