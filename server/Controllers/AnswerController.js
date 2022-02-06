import jwt from 'jsonwebtoken'
import AnswerService from '../Services/AnswerService.js'

class AnswerController {

	async getOne(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { id, questionId } = req.params
			if (!token || !id || !questionId) res.status(400)
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.status(400)
			const answers = (await AnswerService.getAll(questionId)).map((answer) => {
				return {
					id: answer._id,
					text: answer.text,
					index: answer.index
				}
			}).sort((a, b) =>  a.index - b.index)
			return res.json({	answers	})
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

}

export default new AnswerController()