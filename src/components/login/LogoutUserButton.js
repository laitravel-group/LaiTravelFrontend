import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, Space, Tooltip } from "antd";
import { AuthContext } from "../../App";
import { logout } from "../../api";

export default function LogoutUserButton() {
	const auth = useContext(AuthContext);
	const { message } = AntdApp.useApp();
	const navigate = useNavigate();

	const handleLogoutSubmit = async () => {
		try {
			//await logout(localStorage.getItem("authToken"));
			message.success("Log out successfully");
			auth.handleLogout();
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<Space size="large">
			<Button className="header-button" onClick={handleLogoutSubmit}>
				Log Out
			</Button>
			<span style={{ color: "gray" }}>|</span>
			<Tooltip title="My Page" placement="bottom">
				<Button
					type="primary"
					shape="circle"
					style={{
						width: "40px",
						height: "40px",
					}}
					onClick={() => {
						navigate("/user");
					}}
				>
					<UserOutlined />
				</Button>
			</Tooltip>
		</Space>
	);
}
