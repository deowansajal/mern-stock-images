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
    forgotPasswordController,
    resetPasswordController,
    deleteAllUsers,
} = require('../controllers/authController')

const { protect } = require('../middleware/auth')

router.post('/signup', signupValidator, signupController)
router.get('/confirmemail', confirmEmail)
router.post('/login', loginValidator, loginController)
router.post('/forgotpassword', forgotPasswordController)
router.put('/resetpassword/:resettoken', resetPasswordController)
router.get('/me', protect, getMe)
router.put('/me', profileValidator, protect, updateUserProfileController)

module.exports = router
