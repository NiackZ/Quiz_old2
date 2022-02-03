import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap'
import $api from '../http/axios';
import { Context } from '..'
import './Forms.css'

const LoginForm = () => {
	const {store} = useContext(Context)
	const [form, setForm] = useState({
		login: '',
		password: ''
	})

	const changeHandler = event =>{
		setForm({...form, [event.target.name]: event.target.value})
	}

	return (
		<form id="login-modal-form">
			<div className="formset">
				<div className="form-group">
					<label className="form-label" htmlFor="user-login">Логин</label>
					<input className="form-control" type="text" id="user-login" name="login" value={form.login} onChange={changeHandler} />
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="user-pass">Пароль</label>
					<input className="form-control" type="password" id="user-pass" name="password" value={form.password} onChange={changeHandler} />
				</div>
			</div>
			<Button onClick={()=>store.login(form)} name="login-button" type="button" variant="custom" className="btn-fav text-white">Войти</Button>
		</form>
	);
};

export default LoginForm;