import answerModel from "../models/answer-model.js"

class AnswerService {

	async add(data) {
		const answerIds = []
		for (let [index, val] of data.answers.entries()) {
			const createdAnswer = await answerModel.create({
				question: data.questionId,
				text: val.value,
				index
			})
			answerIds.push(createdAnswer._id)
		}
		return answerIds
	}

	async getAll( questionsIds ) {
		const allQuizzes = await answerModel.find( { question : { $in : questionsIds } } );
		return allQuizzes
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

export default new AnswerService()