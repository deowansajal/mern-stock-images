const router = require('express').Router()

const {
    signupValidator,
    loginValidator,
    profileValidator,
} = require('../middleware/authValidator')
const {
    signupController,
    loginController,
    confirmEmail,
    getMe,
    updateUserProfileController,
    deleteAllUsers,
} = require('../controllers/authController')

const { protect } = require('../middleware/auth')

router.post('/signup', signupValidator, signupController)
router.post('/login', loginValidator, loginController)
router.get('/confirmemail', confirmEmail)
router.get('/me', protect, getMe)
router.put('/me', profileValidator, protect, updateUserProfileController)

// Only developments
router.delete('/users', deleteAllUsers)

module.exports = router
