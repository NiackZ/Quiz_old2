import jwt from 'jsonwebtoken'
import QuestionLink from '../Services/QuestionLink.js'

class QuestionLinkController {

	async add(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			console.log(token)
			const { questionParentId, questionParentAnswerIndex } = req.body
			const { questionId } = req.params
			if (!token || !questionId || !questionParentId || !(questionParentAnswerIndex >=0)) res.status(400)
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.status(400)		
			const result = await QuestionLink.add({ questionId, questionParentId, questionParentAnswerIndex })
			return res.json("Успех")
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async getOne(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { questionId } = req.params
			if (!token || !questionId) res.status(400)
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.status(400)
			const result = await QuestionLink.getOne({ questionId })
			return res.json(result)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async delete(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { questionId } = req.params
			if (!token || !questionId) res.status(400)
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.status(400)
			const result = await QuestionLink.deleteOne( questionId )
			return res.json(result)
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

}

export default new QuestionLinkController()