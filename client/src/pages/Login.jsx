import React from 'react';
import { Container } from 'react-bootstrap';
import ControlledTabs from '../components/Tabs';

import LoginForm from '../components/LoginForm';
import RegistratoinForm from '../components/RegistratoinForm';

const Login = () => {
	const tabs = [
		{eventKey:"login-tab", title:"Войти", content: <LoginForm/>},
		{eventKey:"registration-tab", title:"Регистрация", content: <RegistratoinForm/>}
	]
	return (
		<Container style={{width:'500px'}} className="margin-container">
			<ControlledTabs tabs={tabs} onFocus={tabs[0].eventKey}></ControlledTabs>
		</Container>
	);
};

export default Login;