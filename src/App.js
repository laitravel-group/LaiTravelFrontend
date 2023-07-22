import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import User from "./pages/User";
import MyPlans from "./pages/MyPlans";
import NewPlan from "./pages/NewPlan";
import TestPage from "./pages/TestPage";

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
			element: <Home {...props} />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/user",
			element: <User {...props} />,
		},
		{
			path: "/my_plans",
			element: <MyPlans {...props} />,
		},
		{
			path: "/new_plan",
			element: <NewPlan {...props} />,
		},
		{
			path: "/test",
			element: <TestPage {...props} />,
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
					colorBgLayout: "#fffffa",
					colorBgContainer: "#fefefe",
					fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
				},
			}}
		>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
}
