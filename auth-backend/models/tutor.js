const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    studentName: String,
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
    university: {
        type: String
    },
    rating: {
        type: Number
    },
    inbox: [inboxSchema],
    role: {
        type: Number,
        default: 1
    }
})

const tutor = mongoose.model('Tutor', tutorSchema);

module.exports = tutor;