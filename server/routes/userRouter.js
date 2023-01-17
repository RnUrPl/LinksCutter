const {Router} = require('express')
const router = Router()
const {body} = require('express-validator')
const UserController = require('../contollers/UserController')

router.post('/registration',
body('email', 'Incorret email').isEmail(),
body('password', 'Введите пароль').isLength({min: 3, max: 32}),
UserController.registration)
router.post('/login',UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)


module.exports = router 