import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Question = () => {
	const params = useParams();
	console.log(params)
	return (
		<Container className="margin-container text-center">
			<h3 className="text-center">Question.js</h3>
			{params.questionId}
		</Container>
	);
};

export default Question;