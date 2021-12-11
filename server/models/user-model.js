import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	login: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	isActivated: { type: Boolean, default: false },
	isActive: { type: Boolean, default: true }
})

export default mongoose.model('User', UserSchema)