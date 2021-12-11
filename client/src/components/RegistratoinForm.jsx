import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap'
import './Forms.css'

const RegistratoinForm = () => {

	//const {isAuth, setIsAuth} = useContext(AuthContext)
	const [form, setForm] = useState({
		email:'',
		login: '',
		password: '',
		password2: ''
	})

	const changeHandler = event =>{
		setForm({...form, [event.target.name]: event.target.value})
	}

	const reg = async () =>{
		try {
			const response = await axios.post('/api/registration', {...form})
		} catch (error) {
			console.dir(error.response.data)
		}
	} 

	return (
		<form id="registration-modal-form">
			<div className="formset">
				<div className="form-group">
					<label className="form-label" htmlFor="reg-user-mail">E-mail</label>
					<input onChange={changeHandler} value={form.mail} className="form-control" type="email" id="reg-user-mail" name="email" />
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="reg-user-login">Логин</label>
					<input onChange={changeHandler} value={form.login} className="form-control" type="text" id="reg-user-login" name="login" />
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="reg-user-pass">Пароль</label>
					<input onChange={changeHandler} value={form.password} className="form-control" type="password" id="reg-user-pass" name="password" />
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="reg-user-pass2">Подтвердить пароль</label>
					<input onChange={changeHandler} value={form.password2} className="form-control" type="password" id="reg-user-pass2" name="password2" />
				</div>
			</div>
			<Button onClick={reg} name="reg-button" type="button" variant="custom" className="btn-fav text-white">Зарегистироваться</Button>
		</form>
	);
};

export default RegistratoinForm;