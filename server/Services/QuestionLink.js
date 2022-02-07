import questionLink from "../models/questionLink.js"


class QuestionLinkService {

	async add({ questionId, questionParentId, questionParentAnswerIndex }) {
		await this.deleteOne(questionId)
		const result = await questionLink.create({ questionId, questionParentId, questionParentAnswerIndex })
		return result._id
	}

	async getOne({ questionId }) {
		const result = await questionLink.findOne({ questionId })
		if (result)
			return {
				questionParentId: result.questionParentId,
				questionParentAnswerIndex: result.questionParentAnswerIndex
			}
		return null
	}
	async deleteOne(questionId){
		const deletedItem = await questionLink.deleteMany({questionId})
		console.log(deletedItem)
		return deletedItem
	}

	/*
	async delete(quiz_id) {
		const deletedQuiz = await quizModel.deleteOne({ _id: quiz_id })
		return deletedQuiz
	}
	*/
}

export default new QuestionLinkService()