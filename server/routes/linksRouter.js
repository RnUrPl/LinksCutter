const {Router} = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const LinksController = require('../contollers/LiinksController')

const router = Router()

router.post('/generate',authMiddleware,LinksController.generate )
router.get('/getAll',authMiddleware,LinksController.getAll )
router.get('/:id',authMiddleware,LinksController.getById )



module.exports = router