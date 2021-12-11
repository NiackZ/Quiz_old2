import mongoose from 'mongoose'
import userModel from './user-model.js'

const QuizSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: userModel},
	title: {type: String, required: true},
	createdAt: { type: Date, default: Date.now },
	isDeleted: { type: Boolean, default: false }
})

export default mongoose.model('Quiz', QuizSchema)