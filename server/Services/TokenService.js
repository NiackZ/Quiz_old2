import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model.js'

class TokenService{
	async generateTokens(payload){
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn: '10m'})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn:'21d'})
		return { accessToken,	refreshToken }
	}

	async saveTokens(userId, refreshToken){
		const tokenData = await tokenModel.findOne({user:userId})
		if (tokenData){
			tokenData.refreshToken = refreshToken
			return await tokenData.save()
		}
		const token = await tokenModel.create({user: userId, refreshToken})
	}

	async removeToken(refreshToken){
		const tokenData = await tokenModel.deleteOne({refreshToken})
		return tokenData
	}

	async refreshToken(refreshToken){
		const tokenData = await tokenModel.deleteOne({refreshToken})
		return tokenData
	}

	async validateAccessToken(token){
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}
	
	async validateRefreshToken(token){
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}
	
	async findToken(token){
		const tokenData = await tokenModel.findOne({token})
		return tokenData
	}

}
export default new TokenService()