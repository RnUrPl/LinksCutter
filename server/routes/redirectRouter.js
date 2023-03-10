const {Router} = require('express')
const RrdirectRouter = Router()
const {Link} = require('../models/Links')

RrdirectRouter.get('/:code', async(req,res) =>{
    try {
        const link  = await Link.findOne ({code: req.params.code})

        if(link){
            link.clicks++
            await link.save()
            console.log(link)
            return res.redirect(link.from)
        }
        
        res.status(404).json('Wrong link')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

module.exports = RrdirectRouter 

