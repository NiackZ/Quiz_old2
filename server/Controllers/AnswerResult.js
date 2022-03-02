import AnswerResultModel from '../Services/AnswerResult.js'
import jwt from 'jsonwebtoken'

class AnswerResultController {

	async update(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			const { questionId } = req.params
			const answersResults = Object.assign(
				{answers: req.body.filter(ar=>(ar.result !== undefined && ar.result !== ""))}, 
				{questionId}
			)
			const ARResponse = await AnswerResultModel.add(answersResults)
			return res.json(ARResponse)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async getAll(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			const { questionId } = req.params
			const response = await AnswerResultModel.getAll(questionId)
			return res.json(response)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

}

export default new AnswerResultController()