const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Student = require('../models/student');

router.post('/:sender/:userOneId/:userTwoId', async (req, res) => {

    // * user one is tutor, user two is student

    let { sender, userOneId, userTwoId } = req.params;
    let { message } = req.body;

    // return res.send(message);

    try {
        let userOne = await Tutor.findOne({ _id: userOneId });
        if (!userOne) return res.status(400).json({ error: "Tutor does not have account" })
        let userTwo = await Student.findOne({ _id: userTwoId });
        if (!userTwo) return res.status(400).json({ error: "Student does not have account" })

        let userOneInbox = userOne.inbox;
        let userTwoInbox = userTwo.inbox;

        let userOneCurrentChat = userOneInbox.filter(chat => chat.partnerId == userTwoId);

        // return res.json({ userOneCurrentChat })

        if (userOneCurrentChat.length == 0) {
            userOneInbox.push({
                partnerName: userTwo.name,
                partnerId: userTwoId
            })
            userTwoInbox.push({
                partnerName: userOne.name,
                partnerId: userOneId
            })
            userOneCurrentChat = userOneInbox.filter(chat => chat.partnerId == userTwoId);
        }
        let userTwoCurrentChat = userTwoInbox.filter(chat => chat.partnerId == userOneId);

        // return res.json({ userOneCurrentChat, userTwoCurrentChat })

        if (sender == 'tutor') {
            userOneCurrentChat[0].messages.push({
                name: userOne.name,
                message
            })
            userTwoCurrentChat[0].messages.push({
                name: userOne.name,
                message
            })
        } else if (sender == 'student') {
            userOneCurrentChat[0].messages.push({
                name: userTwo.name,
                message
            })
            userTwoCurrentChat[0].messages.push({
                name: userTwo.name,
                message
            })
        }

        try {
            let result = await userOne.save();
            let resultTwo = await userTwo.save();
            res.json({ success: true, result, resultTwo })
        } catch (error) {
            res.json({ error })
        }
    } catch (error) {
        return res.status(400).json({ error: `there has been an error of: ${error}` })
    }
})

module.exports = router;