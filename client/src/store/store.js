import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Store{
	user = {}
	isAuth = false
	isLoading = false
	ready = false

	constructor(){
		makeAutoObservable(this)
	}

	setUser(user){
		this.user = user
	}

	setReady(bool){
		this.ready = bool
	}

	setAuth(bool){
		this.isAuth = bool
	}

	setLoading(bool){
		this.isLoading = bool
	}

	async login(form){
		try {
			const response = await axios.post('/login', {...form})		
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (error) {
			console.dir(error.message);
			console.dir(error.response);
		}
	}

	async reg(email, pass){
		try {
			const response = await axios.post('/registration', {email,pass})
			//console.log(response)			
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (error) {
			console.log(error.response?.data?.message);
		}
	}

	async logout(){
		try {
			await axios.post('/logout')
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({})
		} catch (error) {
			console.log(error.response?.data?.message);
		}
	}

	async checkAuth(){
		this.setLoading(true)
		try {
			const response = await axios.get(`/refresh`)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (error) {
			console.log(error);
		} finally{
			this.setLoading(false)
			this.setReady(true)
		}
	}

}
