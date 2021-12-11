import questionModel from "../models/question-model.js"

class QuestionService {

	async add(data) {
		const createdQuestion = await questionModel.create({ 
			quiz: data.quizId, 
			title: data.title, 
			isParent: data.parent 
		})
		return createdQuestion._id
	}

	/*
	async getAll( userId ) {
		const allQuizzes = await quizModel.find({user: userId})
		return allQuizzes
	}

	async getOne(id, userId) {
		const oneQuiz = await quizModel.find({_id: id, user: userId})
		return oneQuiz
	}

	

	async delete(quiz_id) {
		const deletedQuiz = await quizModel.deleteOne({ _id: quiz_id })
		return deletedQuiz
	}
	*/
}

export default new QuestionService()