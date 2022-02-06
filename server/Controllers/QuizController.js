import QuizService from "../Services/QuizService.js";
import jwt from 'jsonwebtoken'

class QuizController {

	async getAll(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			const addResult = await QuizService.getAll(userData.id)
			return res.json(addResult)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params
			const token = req.headers.authorization.split(' ')[1]
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.json('Нет ИД в userData.id')
			const getResult = await QuizService.getOne(id, userData.id)
			return res.json(getResult)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async add(req, res, next) {
		try {
			const { quizName, user_id } = req.body
			const addResult = await QuizService.add(quizName, user_id)
			return res.json(addResult)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params
			const deleteResult = await QuizService.delete(id)
			return res.json(deleteResult)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

}

export default new QuizController()