
import jwt from 'jsonwebtoken'

class AnswerResult {

	async update(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			
			return res.json('ok')
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

}

export default new AnswerResult()