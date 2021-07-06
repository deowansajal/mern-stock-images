const router = require('express').Router()

const {
    signupValidator,
    loginValidator,
} = require('../middleware/authValidator')
const {
    signupController,
    loginController,
    confirmEmail,
    getMe,
    deleteAllUsers,
} = require('../controllers/authController')

const { protect } = require('../middleware/auth')

router.post('/signup', signupValidator, signupController)
router.post('/login', loginValidator, loginController)
router.get('/confirmemail', confirmEmail)
router.get('/me', protect, getMe)
router.delete('/users', deleteAllUsers)

router.get('/protect', protect, (req, res, next) => {
    res.json({ message: 'I am a protected routes ', authUser: req.user })
})

module.exports = router
