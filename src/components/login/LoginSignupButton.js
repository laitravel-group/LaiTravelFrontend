import React, { useContext, useState } from "react";
import { Button, App as AntdApp } from "antd";
import { AuthContext } from "../../App";
import { login, signup } from "../../api";
import LoginSignupModal from "./LoginSignupModal";

export default function LoginSignupButton() {
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("");

	const { message } = AntdApp.useApp();
	const auth = useContext(AuthContext);

	// open up modal
	const handleLoginOnClick = () => {
		setType("Login");
		setModalOpen(true);
	};
	const handleSignupOnClick = () => {
		setType("Sign Up");
		setModalOpen(true);
	};

	const handleLoginSubmit = async (data) => {
		setLoading(true);
		try {
			await login(data);
			auth.handleLoginSuccess();
		} catch (error) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSignupSubmit = async (data) => {
		setLoading(true);
		try {
			await signup(data);
			message.success("Sign up successfully");
			setModalOpen(false);
		} catch (error) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				type="primary"
				className="header-button"
				onClick={handleLoginOnClick}
			>
				Login
			</Button>
			<Button className="header-button" onClick={handleSignupOnClick}>
				Sign Up
			</Button>
			<LoginSignupModal
				modalOpen={modalOpen}
				loading={loading}
				handleLoginSubmit={handleLoginSubmit}
				handleSignupSubmit={handleSignupSubmit}
				handleModalCancel={() => {
					setModalOpen(false);
				}}
				type={type}
				setType={setType}
			/>
		</>
	);
}
