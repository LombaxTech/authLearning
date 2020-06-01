const express = require('express');
const router = express.Router();

const { signup, signin, signout, requireSignin, isAuth, isTutor, tutorById } = require('../controllers/tutorAuth');

router.get('/', (req, res) => {
    res.send('tutor routes')
})

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

// router.get('/:tutorId', requireSignin, isAuth, isTutor, (req, res) => {
//     // console.log(req.auth)
//     res.send(`user found of: ${req.profile}`)
// })

router.param('tutorId', tutorById)

module.exports = router;