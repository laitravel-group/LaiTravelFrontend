import React, { useContext } from "react";
import { Col, Image, Row, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import LoginSignupButton from "./login/LoginSignupButton";
import LogoutUserButton from "./login/LogoutUserButton";
import { AuthContext } from "../App";
import { useEffect, useState } from "react";

export default function PageHeader() {
	const { token } = theme.useToken();
	const auth = useContext(AuthContext);
	return (
		<Header
			style={{
				height: "128px",
				marginTop: "20px",
				backgroundColor: token.colorBgLayout,
			}}
		>
			<Row justify="space-between">
				<Col>
					<Link to="/">
						<Image
							src="./logo512.png"
							width={128}
							height={128}
							preview={false}
						/>
					</Link>
				</Col>
				<Col style={{ display: "flex", alignItems: "center" }}>
					{auth.authed && <LogoutUserButton />}
					{!auth.authed && <LoginSignupButton />}
				</Col>
			</Row>
		</Header>
	);
}
