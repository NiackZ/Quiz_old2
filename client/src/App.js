import './css/app.css'
//import './css/media.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyNavbar from './modules/MyNavbar'
import AppRouter from './Router/AppRouter'
import { Context } from '.'
import Loading from './pages/Loading';

function App() {

	const {store} = useContext(Context)
	useEffect(() => {
		document.getElementsByTagName('body')[0].className = 'bg-dark text-white'
		localStorage.getItem('token')
			? store.checkAuth()
			: store.setReady(true)
	}, [store.isAuth])
		
	if (!store.ready) return (<Loading/>)

	return (
		<BrowserRouter>
			<MyNavbar />
			<AppRouter />
		</BrowserRouter>
	);
}

export default observer(App);
