import QuizService from "../Services/QuizService.js";
import QuestionService from "../Services/QuestionService.js";
import AnswerService from "../Services/AnswerService.js";
import jwt from 'jsonwebtoken'

class QuestionController {

	async add(req, res, next) {
		try {
			const questionData = Object.assign({
				title: req.body.title,
				parent: req.body.isParent,
				quizId: req.params.id
			})
			const addQuestionId = await QuestionService.add(questionData)
			if (!addQuestionId) return res.status(400)
			const answerData = Object.assign({
				answers: req.body.answers,
				questionId: addQuestionId
			})
			const addAnswersResult = await AnswerService.add(answerData)
			return res.json({ addQuestionId, addAnswersResult })
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async getAll(req, res, next) {
		try {
			const withAnswers = (req.body.answers == undefined ? false : req.body.answers)
			const result = await QuestionService.getAll({ quiz: req.params.id })

			if (!withAnswers)
				return res.json({
					questions: result.map((question) => {
						return {
							id: question._id,
							title: question.title,
							isParent: question.isParent
						}
					})
				})

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
					answers: answers.filter(answer => answer.question == question.id),
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
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.status(400)
			const result = await QuestionService.getOne(questionId)
			if (result === null) return res.status(400)
			const answer = (await AnswerService.getAll(result.id)).map((answer) => {
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
			return res.json({
				id: result._id,
				quiz: result.quiz,
				title: result.title,
				answers: answer,
				isParent: result.isParent
			})
		} catch (error) {
			console.log('error');
			console.dir(error)
			res.status(500).json(error)
		}
	}

	async updateOne(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const { id, questionId } = req.params
			if (!token || !id || !questionId) res.status(400)
			const { userData } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			if (!userData.id) return res.status(400)
			const { title, isParent } = req.body
			const _id = req.body.id
			const updateQuestionResult = await QuestionService.update({ _id, title, isParent })
			/*
			{
				acknowledged: true,
				modifiedCount: 1,
				upsertedId: null,
				upsertedCount: 0,
				matchedCount: 1
				}
			*/
			const answerData = Object.assign({
				answers: req.body.answers,
				questionId: _id
			})
			const addAnswersResult = await AnswerService.update(answerData)
			// const result = await QuestionService.getOne(questionId)
			// if (result === null) return res.status(400)
			// const answer = (await AnswerService.getAll(result.id)).map((answer) => {
			// 	return {
			// 		id: answer._id,
			// 		question: answer.question,
			// 		text: answer.text,
			// 		index: answer.index
			// 	}
			// }).sort((a, b) => (a.question).equals(b.question)
			// 		? a.index - b.index 
			// 		: a.question - b.question
			// )
			// return res.json({
			// 	id: result._id,
			// 	quiz: result.quiz,
			// 	title: result.title,
			// 	answers: answer,
			// 	isParent: result.isParent
			// })
			return res.json({
				questionUpdate: updateQuestionResult.modifiedCount,
				addAnswersCount: addAnswersResult.length
			})
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