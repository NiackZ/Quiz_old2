import mongoose from 'mongoose'
import quizModel from './quiz-model.js'

const QuestionSchema = new mongoose.Schema({
	quiz: {type: mongoose.Schema.Types.ObjectId, ref: quizModel},
	title: {type: String, required: true},
	createdAt: { type: Date, default: Date.now },
	isDeleted: { type: Boolean, default: false },
	isParent: { type: Boolean, default: false }
})

export default mongoose.model('Question', QuestionSchema)