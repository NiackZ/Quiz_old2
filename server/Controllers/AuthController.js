import { validationResult } from 'express-validator'
import AuthService from '../Services/AuthService.js'
import ApiError from '../utils/ApiError.js'

class AuthController {

	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистрации'
				})
			}
			const { login, email, password, password2 } = req.body
			if (password.localeCompare(password2) != 0) return res.json({ message: "Пароли не совпадают" })
			const regResult = await AuthService.reg(login, email, password)
			res.cookie('refreshToken', regResult.refreshToken, { maxAge: 21 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(regResult)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async login(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные'
				})
			}
			const loginResult = await AuthService.login(req.body)

			if (!loginResult.refreshToken) return res.status(500).json(loginResult)

			res.cookie('refreshToken', loginResult.refreshToken, { maxAge: 21 * 24 * 60 * 60 * 1000, httpOnly: true })
			res.json(loginResult)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next){
		try {
			const {refreshToken} = req.cookies
			const token = await AuthService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await AuthService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 21 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

export default new AuthController()
