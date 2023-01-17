const {Link} = require("../models/Links")
const config = require('config')
const shortid = require('shortid')


class LinksController {
    async generate(req,res,next){
        try {
            const baseUrl = config.get('baseURL')
            const {from} = req.body

        
            const code = shortid.generate()
            const existing = await Link.findOne({ from })
        
            if (existing) {
              return res.json({ link: existing })
            }
        
            const to = baseUrl + 't/' + code
            const link = await Link.create({code,to,from, owner: req.user.id})
        
            res.status(201).json({ link })
          } catch (e) {
            next(e)
          }
        }

    async getAll(req,res,next){
        try {
            const links = await Link.find({owner: req.user.id}) 
            res.json(links)
        }catch(e){
            next(e)
        }
    }

    async getById(req,res,next){
        try {
            const link = await Link.findById(req.params.id) 
            res.json(link)
        }catch(e){
            next(e)
        }
    }

}

module.exports = new LinksController()