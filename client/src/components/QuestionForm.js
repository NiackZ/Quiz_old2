import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap'
import { Context } from '..'
import './Forms.css'

const QuestionForm = ({quizId, questionId}) => {
	const { store } = useContext(Context)
	const [question, setQuestion] = useState({
		id: null,
		quiz: null,
		title: '',
		isParent: false,
		answers: [
			{ id: uuidv4(), text: "" },
			{ id: uuidv4(), text: "" }
		]
	})

	const [answerLoad, setAnswerLoad] = useState(true)

	useEffect(() => {
		if (question.answers.length < 2)
			setAnswerLoad(false)
		else
			setAnswerLoad(true)
	}, [question.answers])

	useEffect(() => {
		console.log('questionId: ',questionId)
		if (questionId !== null) getQuestion()
	}, [])

	const getQuestion = async () => {
		const response = await axios.get(
			`/quiz/${quizId}/${questionId}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)
		if (response.data.id)
			setQuestion(response.data)
	}

	const changeHandler = event =>
		setQuestion({ ...question, [event.target.name]: event.target.value })

	const checkboxHandler = event =>
		setQuestion({ ...question, [event.target.name]: !question[event.target.name] })

	const changeAnswer = (event, answerId) =>
		setQuestion({...question, answers: question.answers.map(answer => answer.id === answerId ? { ...answer, text: event.target.value } : answer)})

	const deleteAnswer = (answerId) =>
		setQuestion({...question, answers: question.answers.filter(answer => answer.id != answerId)})

	const addAnswer = () =>
		setQuestion({...question, answers: [...question.answers, { id: uuidv4(), text: "" }]})

	const addQuestion = async () => {
		try {
			const response = await axios.post(`/quiz/${quizId}/questions/new`, question)
			console.log(response?.data)
			if (response.data.addQuestionId) {
				console.log("Вопрос добавлен")
				setQuestion({
					id: null,
					quiz: null,
					title: '',
					isParent: false,
					answers: [
						{ id: uuidv4(), text: "" },
						{ id: uuidv4(), text: "" }
					]
				})
			}
		} catch (error) {
			console.dir(error.response.data)
		}
	}

	function uuidv4() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		)
	}
	console.log(question)
	return (
		<Form>
			<Row className="justify-content-md-center">
				<Col lg={8} className="mb-3">
					<Form.Label>Вопрос</Form.Label>
					<Form.Control className="bg-transparent text-white" type="text" placeholder="Введите вопрос" name="title" value={question.title} onChange={changeHandler} />
				</Col>
				<Col lg={8} className="mb-3" >
					<Form.Check className="bg-transparent text-white" checked={question.isParent} label="Родитель" name="isParent" onChange={checkboxHandler} />
				</Col>
				<Col lg={8} className="mb-3">
					Ответы
				</Col>
				{
					answerLoad
						? ""
						: <Col lg={8} className="mb-3">
							<Alert variant="danger" >
								Необходимо как минимум 2 ответа
							</Alert>
						</Col>
				}
				{question.answers.map((answer, index) =>
					<Col lg={8} className="mb-3 d-flex gap-2" key={answer.id}>
						<Form.Control className="bg-transparent text-white" type="text" placeholder="Введите ответ" name={"answer" + index} value={answer.text} onChange={(e) => changeAnswer(e, answer.id)} />
						<Button type="button" variant="custom" className="btn-red text-white" onClick={() => deleteAnswer(answer.id)}>
							Удалить
						</Button>
					</Col>
				)}
				<div align="center" className="my-2">
					<Col xs={10} lg={4} className="mx-auto mx-lg-1 mb-3">
						<Button type="button" variant="custom" className="btn-fav text-white w-100" onClick={addAnswer}>
							Добавить ответ
						</Button>
					</Col>
					<Col xs={10} lg={4} className="mx-auto mx-lg-1">
						<Button type="button" variant="custom" className="btn-fav text-white w-100" onClick={answerLoad ? addQuestion : null}>
							Добавить вопрос
						</Button>
					</Col>
				</div>
			</Row>
		</Form>
	);
};

export default QuestionForm;