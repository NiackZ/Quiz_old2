import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import userModel from "../models/user-model.js"
import activationLinkModel from "../models/activationLink-model.js"
import TokenService from './TokenService.js';
import UserDto from '../utils/UserData.js';
import ApiError from '../utils/ApiError.js';


class AuthService {

	async DataAndTokens(user) {
		const userData = new UserDto(user)
		const tokens = await TokenService.generateTokens({ userData })
		await TokenService.saveTokens(userData.id, tokens.refreshToken)
		return { ...tokens, user: userData }
	}

	async reg(login, email, password) {
		const errors = []

		const checkEmail = await userModel.find({ email }).catch(function (err) { return { 'ERROR': err } })
		if (checkEmail.length !== 0) errors.push("Данный email уже используется.")

		const checkLogin = await userModel.find({ login }).catch(function (err) { return { 'ERROR': err } })
		if (checkLogin.length !== 0) errors.push("Данный логин уже используется.")

		if (errors.length > 0) return { errors }

		const hashPass = await bcrypt.hash(password, 11)
		const user = await userModel.create({ login, email, password: hashPass })
		const activationLink = uuidv4()
		const createdLink = await activationLinkModel.create({ user: user._id, link: activationLink })
		/*
		Сделать отправку ссылки на почту
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
		*/
		return this.DataAndTokens(user)
	}

	async login(request) {
		const { login, password } = request
		const user = await userModel.findOne({ login })
		if (!user) {
			throw ApiError.badRequest('Пользователь не найден')
		}
		const isPassEq = await bcrypt.compare(password, user.password)
		if (!isPassEq) {
			throw ApiError.badRequest('Неверный пароль')
		}
		return this.DataAndTokens(user)
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.badRequest('Пользователь не авторизован')
		}
		const { userData } = await TokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await TokenService.findToken(refreshToken)
		if (!userData || !tokenFromDB) {
			throw ApiError.badRequest('Пользователь не авторизован')
		}
		const user = await userModel.findById(userData.id)
		return this.DataAndTokens(user)
	}

	async logout(refreshToken) {
		return await TokenService.removeToken(refreshToken)
	}


}

export default new AuthService()