import mongoose from 'mongoose'
import userModel from './user-model.js'

const TokenSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: userModel},
	refreshToken: {type: String, required: true}
})

export default mongoose.model('Token', TokenSchema)