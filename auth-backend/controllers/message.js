const Tutor = require('../models/tutor');
const Student = require('../models/student');

exports.getInbox = async (req, res) => {
    const { userType, userId } = req.params;
    // return res.json({ userType, userId })
    if (userType == 'student') {
        try {
            let student = await Student.findById(userId);
            if (!student) return res.status(400).json({ error: 'no student found' })
            res.json(student.inbox);
        } catch (error) {
            return res.json({ error })
        }

    } else if (userType == 'tutor') {
        try {
            let tutor = await Tutor.findById(userId);
            if (!tutor) return res.status(400).json({ error: 'no tutor found' })
            res.json(tutor.inbox);
        } catch (error) {
            return res.json({ error })
        }

    }
}

exports.sendMessage = async (req, res) => {

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
}