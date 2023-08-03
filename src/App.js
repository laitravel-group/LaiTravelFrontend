import React, { createContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import User from "./pages/User";
import MyPlans from "./pages/MyPlans";
import NewPlan from "./pages/NewPlan";
import TestPage from "./pages/TestPage";

export const AuthContext = createContext();

export default function App() {
	const [authed, setAuthed] = useState();

	useEffect(() => {
		const authToken = localStorage.getItem("authToken");
		setAuthed(authToken !== null);
	}, []);

	const handleLoginSuccess = () => {
		setAuthed(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		setAuthed(false);
	};

	const props = {
		authed: authed,
		handleLoginSuccess: handleLoginSuccess,
		handleLogout: handleLogout,
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/user",
			element: <User />,
		},
		{
			path: "/my_plans",
			element: <MyPlans />,
		},
		{
			path: "/new_plan",
			element: <NewPlan />,
		},
		{
			path: "/test",
			element: <TestPage />,
		},
	]);

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
				token: {
					colorTextLightSolid: "#000",
					colorPrimary: "#ffde59",
					colorPrimaryBg: "#fffffa",
					colorBgSpotlight: "#ffde59",
					colorBgLayout: "#fffffa",
					colorBgContainer: "#fefefe",
					fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
				},
			}}
		>
			<AuthContext.Provider value={props}>
				<AntdApp auth={props}>
					<RouterProvider router={router} />
				</AntdApp>
			</AuthContext.Provider>
		</ConfigProvider>
	);
}
