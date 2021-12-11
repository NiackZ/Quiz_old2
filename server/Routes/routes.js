import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import {body} from 'express-validator'

import AuthController from "../Controllers/AuthController.js";
import QuizController from "../Controllers/QuizController.js";
import QuestionController from "../Controllers/QuestionController.js";


const router = new Router()

/* AUTH */
router.post('/registration', [
	body('email', "Некорректный email").notEmpty().isEmail(),
	body('password', "Некорректный пароль").isLength({min: 6})
], AuthController.registration)
router.post('/login', [
	body('login', "Некорректный логин").notEmpty(),
	body('password', "Некорректный пароль").isLength({min: 6})
], AuthController.login)
router.get('/refresh', AuthController.refresh)
router.post('/logout', AuthController.logout)
/* QUIZ */
router.post('/quiz', QuizController.getAll)
router.post('/quiz/new', QuizController.add)
router.delete('/quiz/:id', QuizController.delete)
router.get('/quiz/:id', QuizController.getOne)
router.post('/quiz/:id/questions/new', QuestionController.add)
// router.get('/posts', PostController.getAll)
// router.get('/posts/:id', PostController.getOne)
// router.put('/posts/', PostController.update)
// router.delete('/posts/:id', PostController.delete)

export default router