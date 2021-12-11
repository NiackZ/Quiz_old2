import mongoose from 'mongoose'
import userModel from './user-model.js'

const ActivationLink = new mongoose.Schema({
	link: { type: String, unique: true, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: userModel }
})

export default mongoose.model('activationLink', ActivationLink)