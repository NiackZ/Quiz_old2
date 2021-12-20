import questionModel from "../models/question-model.js"

class QuestionService {

	async add( data ) {
		const result = await questionModel.create({ 
			quiz: data.quizId, 
			title: data.title, 
			isParent: data.parent 
		})
		return result._id
	}

	async getAll( quiz ) {
		const result = await questionModel.find(quiz)
		return result
	}

	/*
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