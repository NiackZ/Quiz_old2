import $api from '../http/axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '..';
import Input from '../components/Input/Input.jsx';

const Quiz = () => {
	const { store } = useContext(Context)
	const [quizName, setQuizName] = useState('')
	const [quizArray, setQuizArray] = useState([])

	useEffect(() => {
		checkQuiz()
	}, [])

	const checkQuiz = async () =>{
		const response = await $api.post('/quiz', { user_id: store.user.id })
		if (response.data.length > 0 )
			setQuizArray(response.data)
			console.log(response.data)
	}
	

	const changeHandler = event => {
		setQuizName(event.target.value)
	}

	const addNewQuiz = async () => {
		try {
			const response = await $api.post('/quiz/new', { quizName, user_id: store.user.id })
			if (response.status==200){
				const newQuizArray = [...quizArray, response.data]
				setQuizArray(newQuizArray)
			}
		} catch (error) {
			console.dir(error.message);
			console.dir(error.response);
		}
	}

	const delQuiz = async (id) => {
		try {
			const response = await $api.delete(`/quiz/${id}`)
			if (response.status == 200 && response.statusText=="OK")
				setQuizArray(quizArray.filter(item=>item._id != id))
		} catch (error) {
			console.dir(error.message);
			console.dir(error.response);
		}
	}

	return (
		<Container className="margin-container">
			<h3 className="text-center">Quiz</h3>
			<Row className="justify-content-md-center" xxl={4} xl={3} md={2}>
				<Form style={{margin: "20px 5px"}}>
					<Input value={quizName} onChange={changeHandler} id="quiz-name" name="quiz" placeholder="Название" />
					<Button onClick={addNewQuiz} type="button" variant="custom" className="btn-fav text-white w-100">Добавить</Button>
				</Form>
			</Row>
			<div className="quizzes-grid">
			<Row xxl={4} xl={3} md={2} xs={1}>
				{quizArray.map((quiz) => {
					return <Col key={quiz._id} className="quiz-item">
						<div className="quiz-title text-center">
							<span><Link className="nav-link" to={`/user/quiz/${quiz._id}`} >{quiz.title}</Link></span>
						</div>
						<Button onClick={()=>delQuiz(quiz._id)} type="button" variant="custom" className="btn-red text-white w-100">Удалить</Button>
					</Col>
				})}
			</Row>
			</div>
		</Container>
	);
};

export default Quiz;