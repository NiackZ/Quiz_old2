import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '..';
import { publicRoutes, privateRoutes } from './routers';

const AppRouter = () => {
	const { store } = useContext(Context)

	if (store.isAuth){
		return (
			<Switch>
			{privateRoutes.map(route=>
				<Route
					component={route.component}
					exact={route.exact}
					path={route.path}
					key={route.path}
				/>
			)}
			<Redirect to="/" />
		</Switch>
		)
	}

	return (
		<Switch>
		{publicRoutes.map(route=>
			<Route
				component={route.component}
				exact={route.exact}
				path={route.path}
				key={route.path}
			/>
		)}
		<Redirect to="/" />
	</Switch>
	);
};

export default AppRouter;