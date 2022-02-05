// import $api from '../http/axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '..'
// import './Forms.css'

import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";


const ParentQuestion = () => {

	const getQuestions = async () =>{
		console.log("start...")
	}
	useEffect(()=>{
		getQuestions()
	},[])

	return (

		<Form>
			<h3 className="text-center">ParentQuestion.js</h3>
			<Row className="justify-content-md-center">
				<Col lg={8} className="mb-3">
					<Form.Select aria-label="Default select example">
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</Form.Select>
				</Col>
			</Row>
		</Form>
	);
};

export default ParentQuestion;