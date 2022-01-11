import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '..';
import { Link, useLocation } from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';
import Loading from './Loading';
import ControlledTabs from '../components/Tabs';


const QuizItem = () => {
	const location = useLocation()
	const { store } = useContext(Context)
	const [quizName, setQuizName] = useState("")
	const [questionsArray, setQuestionsArray] = useState([])
	const [loading, setLoading] = useState(true)

	const itemId = location.pathname.split('/')[location.pathname.split('/').length - 1]

	useEffect(async () => {
		checkQuiz()
		getAllQuestions()
		setLoading(false)
	}, [])

	const takeGuid = async () => {
		const request = new XMLHttpRequest();
		request.open("GET", "https://api.extendsclass.com/uuid/v5?limit=2", 0);
		request.onreadystatechange = () => {
			console.log(JSON.parse(request.response))
		};
		request.send();
	}

	const checkQuiz = async () => {
		const response = await axios.get(
			`/quiz/${itemId}`,
			{
				headers: {
					Authorization: localStorage.getItem('token')
				}
			}
		)
		setQuizName(response?.data[0].title)
	}

	const getAllQuestions = async () => {
		const response = await axios.post(`/quiz/${itemId}/questions`)
		if (response.data.questions.length > 0) setQuestionsArray(response.data.questions)
	}
	console.log(questionsArray)
	if (loading) return <Loading />
	const tabs = [
		{
			eventKey: "newQuestion", title: "Новый вопрос", content:
				<Container>
					<h3 className="text-center">{quizName}</h3>
					<QuestionForm quizId={itemId} questionId={null} />
				</Container>
		},
		{
			eventKey: "allQuestions", title: "Все вопросы", content:
				<Container>
					<h3 className="text-center">Все вопросы</h3>
					{
						questionsArray.length > 0
							? <Row className="justify-content-md-center all-questions-row">
								<Col lg={8} className="mb-3">
									{
										questionsArray.map(question => {
											return (
											<div key={question.id} className='question-div'>
												<span><Link className="qustion-link text-decoration-none" to={question.id}>{question.title}</Link></span>
												{question.answers.length > 0 
													? <ul>{question.answers.map(answer=> <li key={answer.id}>{answer.text}</li>)}</ul>
													: <div>Нет ответов</div>
												}
											</div>)
										})
									}
								</Col>
							</Row>
							: <></>
					}
				</Container>
		}
	]
	return (
		<Container className="margin-container">
			<ControlledTabs className="d-flex justify-content-center" tabs={tabs} onFocus={tabs[0].eventKey} />
		</Container>
	);
};

export default QuizItem