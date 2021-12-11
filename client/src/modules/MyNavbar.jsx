import React, { useContext } from 'react';
import { Container, Nav, Navbar, Button, Image, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import Input from '../components/Input/Input';
import ControlledTabs from '../components/Tabs';
import MyModal from './MyModal';
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { Context } from '..'
import RegistratoinForm from '../components/RegistratoinForm';
import LoginForm from '../components/LoginForm';
const MyNavbar = ({ children, ...props }) => {
	const tabs = [
		{eventKey:"login-tab", title:"Войти", content: <LoginForm/>},
		{eventKey:"registration-tab", title:"Регистрация", content: <RegistratoinForm/>}
	]
	const { store, modal } = useContext(Context)
	const userBlock = React.forwardRef(({ children, onClick }, ref) => (
		<span
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
		</span>
	));

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg" fixed="top">
				<Container>
					<Nav>
						<Link className="nav-link" to="/">Главная</Link>
						<Link className="nav-link" to="/search">Поиск</Link>
					</Nav>
					<Input placeholder="Поиск" className="search-input text-white w-100 mx-3" onChange={()=>console.log('change')} ></Input>
					{store.isAuth
						?
						<Dropdown align="end" as={ButtonGroup}>
							<Dropdown.Toggle as={userBlock} id="dropdown-custom-1">
								<Image height="40px" src="https://cs14.pikabu.ru/avatars/362/x362715-1456868451.png" roundedCircle />
							</Dropdown.Toggle>
							<Dropdown.Menu variant="dark" className="super-colors">
								<Dropdown.Item eventKey="1" as={Link} to="/user/profile" >Профиль</Dropdown.Item>
								<Dropdown.Item eventKey="1" as={Link} to="/user/quiz" >Quiz</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4" onClick={()=>{modal.setShow(false);store.logout()}}>Выход</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						: <>
							<Button
								variant="custom"
								className="btn-fav text-white text-center" style={{padding:'3px 15px', marginRight:'5px'}}
								onClick={() => {
									modal.setModalFocus('registration-tab')
									modal.setShow(true)
								}}>
								Регистрация
							</Button>
							<Button
								variant="custom"
								className="btn-fav text-white text-center" style={{padding:'3px 15px'}}
								onClick={() => {
									modal.setModalFocus('login-tab')
									modal.setShow(true)
								}}>
								Войти
							</Button>
						</>
					}
				</Container>
			</Navbar>
			{!store.isAuth &&
				<MyModal>
					<ControlledTabs tabs={tabs} ></ControlledTabs>
				</MyModal>
			}

		</>
	);
};

export default observer(MyNavbar)