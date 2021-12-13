import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '..';
import { useLocation } from 'react-router-dom';
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

	useEffect(async() => {
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

	const getAllQuestions = async() => {
		const response = await axios.post(`/quiz/${itemId}/questions`)
		if ( response.data.length > 0 ) setQuestionsArray(response.data)
	}

	if (loading) return <Loading/>
	const tabs = [
		{
			eventKey:"newQuestion", title:"Новый вопрос", content:
			<Container>
				<h3 className="text-center">{quizName}</h3>
				<QuestionForm quizId={itemId}/>
			</Container>
		},
		{
			eventKey:"allQuestions", title:"Все вопросы", content: 
			<Container>
				<h3 className="text-center">Все вопросы</h3>
				{
					questionsArray.length > 0
					? questionsArray.map(question=> <div>{question.title}</div>)
					: <></>
				}
			</Container>
		}
	]
	return (
		<Container className="margin-container">
			<ControlledTabs className="d-flex justify-content-center" tabs={tabs} onFocus={tabs[0].eventKey}/>
		</Container>
	);
};

export default QuizItem