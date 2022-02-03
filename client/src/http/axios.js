import axios from 'axios'

const $api = axios.create({
	baseURL: 'http://localhost:5000/api',
	withCredentials: true
})

$api.interceptors.request.use( (config) =>{
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.response.use( (config) =>{
	return config
}, async (error)=>{
	const originalRequest = error.config
	if (error.response.data.message == "jwt expired" && error.config && !error.config._isRetry){
		originalRequest._isRetry = true
		try {
			const response = await $api.get(`/refresh`)
			localStorage.setItem('token', response.data.accessToken)
			return $api.request(originalRequest)
		} catch (error) {
			console.log('Пользователь не авторизован!');
		}
	}
	throw error;
})

export default $api