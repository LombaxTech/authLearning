const express = require('express');
const router = express.Router();
const { getTutor, getTutors, getStudent } = require('../controllers/user');


// router.get('/tutor/:tutorId', getTutor)
router.get('/tutors/profiles', getTutors)
router.get('/tutors/profile/:tutorId', getTutor)
router.get('/students/profile/:studentId', getStudent)

module.exports = router;