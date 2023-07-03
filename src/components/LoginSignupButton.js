import React, { useState } from "react";
import { Button, message } from "antd";
import { login, signup } from "../api";
import LoginSignupModal from "./LoginSignupModal";

export default function LoginSignupButton({ onLoginSuccess }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("");

	const [messageApi, contextHolder] = message.useMessage();

	// open up modal
	const handleLoginOnClick = () => {
		setType("Login");
		setModalOpen(true);
	};
	const handleSignupOnClick = () => {
		setType("Sign Up");
		setModalOpen(true);
	};

	// close modal
	const handleModalCancel = () => {
		setModalOpen(false);
	};

	const handleLoginSubmit = async (data) => {
		console.log(data);
		setLoading(true);
		try {
			await login(data);
			onLoginSuccess();
		} catch (error) {
			messageApi.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSignupSubmit = async (data) => {
		console.log(data);
		setLoading(true);
		try {
			await signup(data);
			messageApi.success("Sign up successfully");
			setModalOpen(false);
		} catch (error) {
			messageApi.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{contextHolder}
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
				handleModalCancel={handleModalCancel}
				type={type}
				setType={setType}
			/>
		</>
	);
}
