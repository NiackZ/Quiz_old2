import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Question = () => {
	const params = useParams();
	console.log(params)
	useEffect(() => {
		getQuestion()
	})

	const getQuestion = async () => {
		const response = await axios.get(
			`/quiz/${params.id}/${params.questionId}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)
		console.log(response?.data)
	}

	return (
		<Container className="margin-container text-center">
			<h3 className="text-center">Question.js</h3>
			{params.questionId}
		</Container>
	);
};

export default Question;