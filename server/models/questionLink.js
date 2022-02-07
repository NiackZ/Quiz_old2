import mongoose from 'mongoose'
import questionModel from './question-model.js'

const QuestionLinkSchema = new mongoose.Schema({
	questionId: { type: mongoose.Schema.Types.ObjectId, ref: questionModel, required: true },
	questionParentId: { type: mongoose.Schema.Types.ObjectId, ref: questionModel, required: true },
	questionParentAnswerIndex: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('QuestionLink', QuestionLinkSchema)