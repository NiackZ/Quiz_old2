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
		[answerArray, setAnswerArray] = useState([]),
		[answersResults, setAnswersResults] = useState([]);

	const getQuestionAnswers = async () => {
		const response = await $api.post(`/quiz/${quizId}/${questionId}/answers`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		if (response.data?.answers.length > 0) {
			setAnswerArray(response.data.answers)
		}
	}

	const answerChange = async (e) => {
		const answerIndex = e.target.name.substring("answer_".length)
		const newAnswerArray = answerArray.map((aa) => {
			if (aa.index === Number(answerIndex)) {
				return { ...aa, result: e.target.value }
			}
			return { ...aa }
		})
		setAnswerArray(newAnswerArray)
	}

	const updateResults = async()=>{
		const response = await $api.post(`/quiz/${quizId}/${questionId}/results`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		console.log(response.data)
	}

	useEffect(() => getQuestionAnswers(), [])

	console.log(answerArray);
	return (
		<Form>
			<Row className="justify-content-md-center">
				<Col lg={8} className="mb-3">
					Ответы
				</Col>
				{answerArray.map((answer) =>
					<Col lg={8} className="mb-3 d-block gap-2" key={answer.id}>
						<Form.Label>{answer.text}</Form.Label>
						<Form.Control className="bg-transparent text-white" type="text" placeholder="Введите результат" name={"answer_" + answer.index} onChange={e => answerChange(e)} />
					</Col>
				)}
				<div align="center" className="my-2">
					<Col xs={10} lg={4} className="mx-auto mx-lg-1 mb-3">
						<Button type="button" variant="custom" className="btn-fav text-white w-100" onClick={updateResults}>
							Обновить ответы
						</Button>
					</Col>
				</div>
			</Row>
		</Form>
	)
};
export default React.memo(AnswerResult);