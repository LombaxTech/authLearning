const User = require('../models/user');

exports.getTutors = async (req, res) => {
    try {
        const tutors = await User.find({ role: 1 });
        if (!tutors) return res.status(400).json({ message: "no tutors found" });

        res.send(tutors);
    } catch (error) {
        return res.status(400).json({ error: `error of: ${error}` })
    }
}

exports.getTutor = async (req, res) => {
    const { tutorId } = req.params;
    try {
        const tutor = await User.findById(tutorId);
        if (!tutor) return res.status(400).json({ message: "no such tutor found" });

        res.send(tutor);
    } catch (error) {
        return res.status(400).json({ error: `error of: ${error}` })
    }
}