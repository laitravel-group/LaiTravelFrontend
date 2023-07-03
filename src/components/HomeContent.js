import React from "react";
import { Row, Col, Image, Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router";

export default function HomeContent(props) {
	const navigate = useNavigate();
	const handleNewPlanLinkClick = () => {
		navigate("/new_plan", { state: { subPage: "search" } });
	};

	return (
		<Content style={{ marginTop: "30px" }}>
			<Row justify="space-evenly">
				<Col className="home-panel">
					<Layout
						style={{ paddingLeft: "40px", textAlign: "center" }}
					>
						<Content
							style={{
								paddingTop: "50px",
								fontSize: "48px",
								fontFamily: "Segoe UI",
								fontWeight: "bolder",
							}}
						>
							Easy trip planning
						</Content>
						<Content
							style={{
								fontSize: "24px",
								fontFamily: "Segoe Print",
							}}
						>
							Plan your trip with just a few clicks
						</Content>
						<Content style={{ marginTop: "50px" }}>
							<Button
								type="primary"
								id="home-new-trip-button"
								onClick={handleNewPlanLinkClick}
							>
								Start Now
							</Button>
						</Content>
					</Layout>
				</Col>
				<Col className="home-panel">
					<Image src="./pic.png" preview={false}></Image>
				</Col>
			</Row>
		</Content>
	);
}
