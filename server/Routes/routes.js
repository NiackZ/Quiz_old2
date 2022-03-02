import { Router } from "express";
import {body} from 'express-validator'

import AuthController from "../Controllers/AuthController.js";
import QuizController from "../Controllers/QuizController.js";
import QuestionController from "../Controllers/QuestionController.js";
import AnswerController from "../Controllers/AnswerController.js";
import QuestionLink from "../Controllers/QuestionLink.js";
import AnswerResult from "../Controllers/AnswerResult.js";


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
router.post('/quiz/:id/questions', QuestionController.getAll)
router.get('/quiz/:id/:questionId', QuestionController.getOne)
router.put('/quiz/:id/:questionId', QuestionController.updateOne)
router.post('/quiz/:id/:questionId/answers', AnswerController.getOne)
router.post('/quiz/:id/:questionId/answers2', AnswerController.getOne2)
router.post('/quiz/:id/:questionId/results', AnswerResult.update)
router.get('/quiz/:id/:questionId/results', AnswerResult.getAll)
router.post('/quiz/:id/:questionId/link', QuestionLink.add)
router.get('/quiz/:id/:questionId/link', QuestionLink.getOne)
router.delete('/quiz/:id/:questionId/link', QuestionLink.delete)
export default router