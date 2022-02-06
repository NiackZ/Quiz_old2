// import $api from '../http/axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '..'
// import './Forms.css'

import { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import $api from "../../http/axios"
import Select from 'react-select'
import '../../css/react-select.css'

const customStyles = {
	menulist: (provided) => ({
		...provided,
		text: 'yellow',
		color: 'aqua',
		background: '#2f3439',
		':hover': {
			color: 'yellow',
			background: 'green',
		},
		':focus': {
			color: 'yellow',
			background: 'green',
		},
		':active': {
			color: 'yellow',
			background: 'green',
		},
		':target': {
			color: 'yellow',
			background: 'green',
		},
		':visited': {
			color: 'yellow',
			background: 'green',
		}
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
		}
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: 'white',
		opacity: state.isDisabled ? 0.5 : 1,
		transition: 'opacity 300ms'
	})
}

const ParentQuestion = () => {
	const location = useLocation()
	const quizId = location.pathname.split('/')[location.pathname.split('/').length - 2]
	const questonId = location.pathname.split('/')[location.pathname.split('/').length - 1]

	const [selectedOption, setSelectedOption] = useState([]);
	const [selectedParentQuestion, setSelectedParentQuestion] = useState(null);
	const [answerOption, setAnswerOption] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	useEffect(() => {
		getAllQuestions()
	}, [])

	useEffect(async () => {
		setSelectedAnswer(null)
		console.log('selectedParentQuestion = ', selectedParentQuestion);
		if (selectedParentQuestion !== null) {
			const response = await $api.post(`/quiz/${quizId}/${selectedParentQuestion.value}/answers`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
			if (response.data?.answers.length > 0) {
				console.log(response.data.answers);
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

	const getAllQuestions = async () => {
		const response = await $api.post(`/quiz/${quizId}/questions`, { answers: false })
		const data = response.data.questions.filter(q => q.id !== questonId).map((q) => {
			return {
				isParent: q.isParent,
				value: q.id,
				label: q.title
			}
		})
		setSelectedOption(data)
	}

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
			</Row>
		</Form>
	);
};

export default ParentQuestion;