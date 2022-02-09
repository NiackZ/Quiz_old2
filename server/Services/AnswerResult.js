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
		const deletedQuiz = await answerResult.deleteMany({ questionId })
		return deletedQuiz
	}
}

export default new AnswerResultService()