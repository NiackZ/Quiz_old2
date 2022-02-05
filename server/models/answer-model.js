import mongoose from 'mongoose'
import questionModel from './question-model.js'

const AnswerSchema = new mongoose.Schema({
	question: { type: mongoose.Schema.Types.ObjectId, ref: questionModel, required: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	index: { type: Number, required: true }
})

export default mongoose.model('Answer', AnswerSchema)