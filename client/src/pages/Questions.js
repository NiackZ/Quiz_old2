import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ParentQuestion from '../components/Forms/ParentQuestion';
import QuestionForm from '../components/QuestionForm';

const Question = () => {
	const params = useParams();

	return (
		<Container className="margin-container">
			<h3 className="text-center">Questions.js</h3>
			<div className="text-center">{params.questionId}</div>
		 	<QuestionForm quizId={params.id} questionId={params.questionId} /> 
			<ParentQuestion quizId={params.id} questionId={params.questionId}/>
		</Container>
	);
};

export default Question;