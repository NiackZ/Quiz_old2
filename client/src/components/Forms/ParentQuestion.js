// import $api from '../http/axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '..'
// import './Forms.css'

import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import $api from "../../http/axios"
import Select from 'react-select'
import '../../css/react-select.css'

const customStyles = {
	menulist: (provided) => ({
		...provided,
		text: 'yellow',
		color: 'aqua',
		background: '#2f3439'
	}),
	valueContainer: (provided) => ({
		...provided,
		text: 'yellow',
		color: 'aqua',
		background: '#2f3439'
	}),
	menu: (provided) => ({
		...provided,
		color: 'red',
		background: '#2f3439',
		boxSizing: 'border-box'
	}),

	control: (provided) => ({
		...provided,
		border: '1px solid white',
		borderRadius: '0px',
		background: '#2f3439',
	}),
	clearIndicator: (provided) => ({
		...provided,
		':hover': {
			color: 'crimson',
		},

	}),
	dropdownIndicator: (provided) => ({
		...provided,
		':hover': {
			color: 'gray',
		},

	}),
	option: (provided, state) => ({
		...provided,
		background: '#2f3439',
		transition: '200ms',
		color: state.isSelected ? 'aqua' : 'white',
		':hover': {
			color: state.isSelected ? 'aqua' : 'yellow',
			cursor: 'pointer'
		},
		':active': {}
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: 'white',
		opacity: state.isDisabled ? 0.5 : 1,
		transition: 'opacity 300ms'
	})
}

const ParentQuestion = ({ quizId, questionId }) => {

	const [selectedOption, setSelectedOption] = useState([]);
	const [selectedParentQuestion, setSelectedParentQuestion] = useState(null);
	const [answerOption, setAnswerOption] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [link, setLink] = useState(null);
	const [loadedLink, setLoadedLink] = useState(false);

	useEffect(() => {
		getAllQuestions()
		checkQuestionLink()
	}, [])

	useEffect(async () => {
		setSelectedAnswer(null)
		if (selectedParentQuestion) {
			const response = await $api.post(`/quiz/${quizId}/${selectedParentQuestion.value}/answers`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
			if (response.data?.answers.length > 0) {
				const data = response.data.answers.map((a) => {
					return {
						value: a.id,
						label: a.text,
						index: a.index
					}
				})
				setAnswerOption(data)
			}
			else setAnswerOption([])
		}
	}, [selectedParentQuestion])

	const checkQuestionLink = async () => {
		const response = await $api.get(`/quiz/${quizId}/${questionId}/link`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		setLink(response.data)
	}

	const getAllQuestions = async () => {
		const response = await $api.post(`/quiz/${quizId}/questions`, { answers: false })
		const data = response.data.questions.filter(q => q.id !== questionId).map((q) => {
			return {
				isParent: q.isParent,
				value: q.id,
				label: q.title
			}
		})
		setSelectedOption(data)
	}

	const linkQuestions = async () => {
		const data = {
			questionId,
			questionParentId: selectedParentQuestion.value,
			questionParentAnswerIndex: selectedAnswer.index
		}
		const response = await $api.post(`/quiz/${quizId}/${questionId}/link`, data,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
		console.log(response)
		if (response.data == "Успех") {
			const dd = {
				questionParentId: selectedParentQuestion.value,
				questionParentAnswerIndex: selectedAnswer.index
			}
			console.log(dd);
			setLink(dd)
		}
	}

	useEffect(() => {
		if (!loadedLink)
			if (link) {
				setSelectedParentQuestion(selectedOption.filter(o => o.value == link.questionParentId)[0])
				if (answerOption.length != 0) {
					setSelectedAnswer(answerOption.filter(o => o.index == link.questionParentAnswerIndex)[0])
					setLoadedLink(true)
				}
			}
		},
		[link, selectedOption, answerOption]
	)
	
	return (
		<Form>
			<h3 className="text-center">ParentQuestion.js</h3>
			<Row className="justify-content-md-center">
				<Col lg={8} className="mb-3">
					{selectedParentQuestion == null ? "Пусто" : selectedParentQuestion.label}
					<Select
						className="custom-react-select-parent"
						styles={customStyles}
						isClearable={true}
						value={selectedParentQuestion}
						onChange={(e) => setSelectedParentQuestion(e)}
						options={selectedOption}
						placeholder={'Выберите родительский вопрос...'}
					/>
					{selectedParentQuestion !== null
						? <Select
							styles={customStyles}
							isClearable={true}
							value={selectedAnswer}
							onChange={(e) => setSelectedAnswer(e)}
							options={answerOption}
							placeholder={'Выберите ответ...'}
						/>
						: ""
					}
				</Col>
				{selectedAnswer !== null
					? <div align="center" className="my-2">
						<Col xs={10} lg={4} className="mx-auto mx-lg-1 mb-3">
							<Button type="button" variant="custom" className="btn-fav text-white w-100" onClick={linkQuestions}>
								Связать вопросы
							</Button>
						</Col>
					</div>
					: null}
			</Row>
		</Form>
	);
};

export default ParentQuestion;