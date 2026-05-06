const { Token } = require("../models/Token")
const jwt = require('jsonwebtoken')


class TokenService{
    generateTokens(payload){
        const accesToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn : "15m"})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn : "30d"})
        return {
            accesToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const tokens = await Token.create({user: userId, refreshToken})
        return tokens
    }

    validateAccessToken(tokens) {
        try {
            const userData = jwt.verify(tokens, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(tokens) {
        try {
            const userData = jwt.verify(tokens, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken})
        return tokenData;
    }

}

module.exports = new TokenService()