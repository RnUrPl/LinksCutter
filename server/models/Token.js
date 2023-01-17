const {Schema, model,Types} = require('mongoose')

const shema = new Schema({
    userId: {type: Types.ObjectId, ref: "User"},
    refreshToken: {type: String, required: true}
})

const Token =  model('Token', shema)
module.exports = {Token}

