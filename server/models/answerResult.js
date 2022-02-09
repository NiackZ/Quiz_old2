import mongoose from 'mongoose'
import questionModel from './question-model.js'

const AnswerResultSchema = new mongoose.Schema({
	questionId: { type: mongoose.Schema.Types.ObjectId, ref: questionModel, required: true },
	questionAnswerIndex: { type: Number, required: true },
	value: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('AnswerResult', AnswerResultSchema)