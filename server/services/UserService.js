const {User} = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const UserDto = require("../dtos/userDto")
const tokenService = require('./TokenService')
const { Token } = require("../models/token")
const ApiError = require("../exception/ApiError")

class UserService{
    async registration(email,password){
        const candidate = await User.findOne({ email })
      console.log(candidate)
        if (candidate) {
            throw ApiError.BadRequest( 'Account with this email already exist, please login!')
        }
        const hashedPassword = await bcrypt.hash(password, 12)
       
        const user = await User.create({email,password: hashedPassword})
        const userDto = new UserDto(user)
        console.log(user)
        const tokens= tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
    
    async login(email, password) {
        const candidate = await User.findOne({email})
        
        if (!candidate) {
            throw ApiError.BadRequest('There is no account with this email, please complete registration!')
        }
        const isPassEquals = await bcrypt.compare(password, candidate.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Wrong password')
        }

        const userDto = new UserDto(candidate);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)

        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tknFrmDb = await tokenService.findToken(refreshToken)
        if (!userData || !tknFrmDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

   


    
}

module.exports= new UserService()