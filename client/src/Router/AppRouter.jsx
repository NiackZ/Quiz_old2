import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context } from '..';
import { publicRoutes, privateRoutes } from './routers';

const AppRouter = () => {
	const { store } = useContext(Context)

	if (store.isAuth){
		return (
			<Routes>
				{privateRoutes.map(route=>
					<Route
						element={route.element}
						path={route.path}
						key={route.path}
					/>
				)}
				<Route path="/"/>
			</Routes>
		)
	}

	return (
		<Routes>
			{publicRoutes.map(route=>
				<Route
					element={route.element}
					path={route.path}
					key={route.path}
				/>
			)}
			<Route path="/"  />
		</Routes>
	);
};

export default AppRouter;