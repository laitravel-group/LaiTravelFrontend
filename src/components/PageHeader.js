import React from "react";
import { Col, Image, Row, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import LoginSignupButton from "./login/LoginSignupButton";

export default function PageHeader() {
	const { token } = theme.useToken();
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
					<LoginSignupButton />
				</Col>
			</Row>
		</Header>
	);
}
