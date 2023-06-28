import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function LoginSignupModal(props) {
	const {
		type,
		setType,
		modalOpen,
		loading,
		handleLoginSubmit,
		handleSignupSubmit,
		handleModalCancel,
	} = props;
	return (
		<Modal
			title={type}
			open={modalOpen}
			onCancel={handleModalCancel}
			footer={null}
		>
			{type == "Login" && (
				<Form onFinish={handleLoginSubmit}>
					<Form.Item
						style={{ marginTop: "24px" }}
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your Username!",
							},
						]}
					>
						<Input
							disabled={loading}
							prefix={<UserOutlined />}
							placeholder="Username"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input.Password
							disabled={loading}
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							loading={loading}
							type="primary"
							htmlType="submit"
							style={{ width: "100%" }}
							className="custom-primary-button"
						>
							Log in
						</Button>
						<span>
							Do not have an account?
							<Button
								type="link"
								onClick={() => setType("Sign Up")}
							>
								Sign Up
							</Button>
						</span>
					</Form.Item>
				</Form>
			)}

			{type == "Sign Up" && (
				<Form onFinish={handleSignupSubmit}>
					<Form.Item
						style={{ marginTop: "24px" }}
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input
							disabled={loading}
							prefix={<UserOutlined />}
							placeholder="Username"
						/>
					</Form.Item>
					<Form.Item
						name="display_name"
						rules={[
							{
								required: true,
								message: "Please input your display name!",
							},
						]}
					>
						<Input disabled={loading} placeholder="Display Name" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input.Password
							disabled={loading}
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										"Passwords do not match!"
									);
								},
							}),
						]}
					>
						<Input.Password placeholder="Confirm Password" />
					</Form.Item>
					<Form.Item>
						<Button
							loading={loading}
							type="primary"
							htmlType="submit"
							style={{ width: "100%" }}
							className="custom-primary-button"
						>
							Sign up
						</Button>
						<span>
							Already have an account?
							<Button
								type="link"
								onClick={() => setType("Login")}
							>
								Login
							</Button>
						</span>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
}
