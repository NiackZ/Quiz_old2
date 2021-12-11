import Home from "../pages/Home"
import Login from "../pages/Login"
import Search from "../pages/Search"
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'
import QuizItem from "../pages/QuizItem"

export const publicRoutes = [
	{path:'/', component: Home, exact: true},
	{path:'/search', component: Search, exact: true},
	{path:'/login', component: Login, exact: true}
]

export const privateRoutes = [
	{path:'/', component: Home, exact: true},
	{path:'/search', component: Search, exact: true},
	{path:'/user/profile', component: Profile, exact: true},
	{path:'/user/quiz', component: Quiz, exact: true},
	{path:'/user/quiz/:id', component: QuizItem, exact: true}
]