import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '..';
import { useLocation } from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';
import Loading from './Loading';


const QuizItem = () => {
	const location = useLocation()
	const { store } = useContext(Context)
	const [quizName, setQuizName] = useState("")
	const [loading, setLoading] = useState(true)

	const itemId = location.pathname.split('/')[location.pathname.split('/').length - 1]

	useEffect(async() => {
		checkQuiz()
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
		setLoading(false)
		setQuizName(response?.data[0].title)
		//console.log(response?.data[0])
	}

	if (loading) return <Loading/>

	return (
		<Container className="margin-container">
			<h3 className="text-center">{quizName}</h3>
			<QuestionForm quizId={itemId}/>
		</Container>
	);
};

export default QuizItem;