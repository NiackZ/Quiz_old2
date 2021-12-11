import quizModel from "../models/quiz-model.js"

class QuizService {

	async getAll( userId ) {
		const allQuizzes = await quizModel.find({user: userId})
		return allQuizzes
	}

	async getOne(id, userId) {
		const oneQuiz = await quizModel.find({_id: id, user: userId})
		return oneQuiz
	}

	async add(quizName, userId) {
		const createdLink = await quizModel.create({ user: userId, title: quizName })
		return createdLink
	}

	async delete(quiz_id) {
		const deletedQuiz = await quizModel.deleteOne({ _id: quiz_id })
		return deletedQuiz
	}

}

export default new QuizService()