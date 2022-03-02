import answerResult from "../models/answerResult.js"

class AnswerResultService {

	async add(data) {
		const {questionId, answers} = data
		await this.deleteByQuestionId(questionId)
		const response = await Promise.all(answers.map(async(a)=>{
			return await answerResult.create({questionId, questionAnswerIndex: a.index, value: a.result})
		}))
		//const result = await answerResult.create
		//return result._id
		console.log(response);
		return response
	}
	
	async deleteByQuestionId(questionId) {
		const response = await answerResult.deleteMany({ questionId })
		return response
	}

	async getAll(questionId) {
		const response = (await answerResult.find({ questionId })).map((result) => {
			return {
				id: result._id,
				value: result.value,
				index: result.questionAnswerIndex
			}
		})
		return response
	}
}

export default new AnswerResultService()