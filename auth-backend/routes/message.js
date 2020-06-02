const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Student = require('../models/student');

const { sendMessage, getInbox } = require('../controllers/message');

router.post('/:sender/:userOneId/:userTwoId', sendMessage);
router.get('/inbox/:userType/:userId', getInbox);
router.get('/:currentUser/:userOneId/:userTwoId', async (req, res) => {
    const { currentUser, userOneId, userTwoId } = req.params;

    const tutor = await Tutor.findById({ _id: userOneId })
    if (!tutor) return res.status(400).json({ error: 'No Tutor found' });

    const student = await Student.findById({ _id: userTwoId });
    if (!student) return res.status(400).json({ error: 'no student found' });

    if (currentUser == 'student') {
        let currentChat = student.inbox.filter(chat => chat.partnerId == userOneId)
        res.json(currentChat);
    }

    if (currentUser == 'tutor') {
        let currentChat = tutor.inbox.filter(chat => chat.partnerId == userTwoId)
        res.json(currentChat);
    }
})

module.exports = router;