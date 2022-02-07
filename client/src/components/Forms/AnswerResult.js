// import $api from '../http/axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '..'
// import './Forms.css'
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import $api from "../../http/axios"
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";

const AnswerResult = () => {
	const params = useParams(),
		quizId = params.id,
		questionId = params.questionId,
		[answerArray, setAnswerArray] = useState([]);

	const getQuestionAnswers = async () => {
		const response = await $api.post(`/quiz/${quizId}/${questionId}/answers`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		if (response.data?.answers.length > 0)
			setAnswerArray(response.data.answers)
	}

	useEffect(() => getQuestionAnswers(), [])


	return (
		<Form>
			<Row className="justify-content-md-center">
				<Col lg={8} className="mb-3">
					Ответы
				</Col>
				{answerArray.map((answer) =>
					<Col lg={8} className="mb-3 d-block gap-2" key={answer.id}>
						<Form.Label>{answer.text}</Form.Label>
						<Form.Control className="bg-transparent text-white" type="text" placeholder="Введите результат" name={"answer" + answer.index} onChange={null} />
					</Col>
				)} 
			</Row>
		</Form>
	)
};
export default React.memo(AnswerResult);