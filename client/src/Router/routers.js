import Home from "../pages/Home"
import Login from "../pages/Login"
import Search from "../pages/Search"
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'
import QuizItem from "../pages/QuizItem"
import Question from "../pages/Questions"

export const publicRoutes = [
	{ path: '/', element: <Home/> },
	{ path: '/search', element: <Search/> },
	{ path: '/login', element: Login }
]

export const privateRoutes = [
	{ path: '*', element: <Home/> },
	{ path: 'search', element: <Search/> },
	{ path: 'user/profile', element: <Profile/> },
	{ path: 'user/quiz', element: <Quiz/> },
	{ path: 'user/quiz/:id', element: <QuizItem/> },
	{ path: 'user/quiz/:id/:questionId', element: <Question/> }
]