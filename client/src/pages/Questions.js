import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import QuestionForm from '../components/QuestionForm';

const Question = () => {
	const params = useParams();

	return (
		<Container className="margin-container">
			<h3 className="text-center">Questions.js</h3>
			<div className="text-center">{params.questionId}</div>
			<QuestionForm quizId={params.id} questionId={params.questionId} />
		</Container>
	);
};

export default Question;