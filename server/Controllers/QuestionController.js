import QuizService from "../Services/QuizService.js";
import QuestionService from "../Services/QuestionService.js";
import AnswerService from "../Services/AnswerService.js";
import jwt from 'jsonwebtoken'

class QuestionController {

	async add(req, res, next) {
		try {
			const questionData = Object.assign({
				title: req.body.title,
				parent: req.body.parent,
				quizId: req.params.id
			})
			const addQuestionId = await QuestionService.add(questionData)
			let addAnswersResult = null
			if (addQuestionId) {
				const answerData = Object.assign({
					answers: req.body.answers,
					questionId: addQuestionId
				})
				addAnswersResult = await AnswerService.add(answerData)
			}
			return res.json({ addQuestionId, addAnswersResult })
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async getAll(req, res, next) {
		try {
			const result = await QuestionService.getAll({ quiz: req.params.id })
			const ids = result.map(q => q._id)
			const answers = (await AnswerService.getAll(ids)).map((answer) => {
				return {
					id: answer._id,
					question: answer.question,
					text: answer.text,
					index: answer.index
				}
			}).sort((a, b) => (a.question).equals(b.question)
					? a.index - b.index 
					: a.question - b.question
			)
			const questions = result.map((question) => {
				return {
					id: question._id,
					quiz: question.quiz,
					title: question.title,
					answers: answers.filter(answer=>answer.question == question.id),
					isParent: question.isParent
				}
			})
			return res.json({ questions })
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async getOne(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { id, questionId } = req.params
			if (!token || !id || !questionId) res.status(400)
			 const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			 console.log(userData)
			// const getResult = await QuizService.getOne(id, userData.id)
			// return res.json(getResult)
			return res.json('hey')
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

export default new QuestionController()