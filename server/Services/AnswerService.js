import answerModel from "../models/answer-model.js"

class AnswerService {

	async add(data) {
		const answerIds = []
		for (let [index, val] of data.answers.entries()) {
			const createdAnswer = await answerModel.create({
				question: data.questionId,
				text: val.text,
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

	async deleteAllByQuestionId(_id) {
		const deletedItem = await answerModel.deleteMany({question: _id})
		return deletedItem
	}

	async update(data) {
		await this.deleteAllByQuestionId(data.questionId)
		return await this.add(data)
	}

	/*
	async getOne(id, userId) {
		const oneQuiz = await quizModel.find({_id: id, user: userId})
		return oneQuiz
	}
	*/
}

export default new AnswerService()