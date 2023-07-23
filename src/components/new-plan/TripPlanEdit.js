import { Content } from "antd/es/layout/layout";
import React from "react";

export default function TripPlanEdit({ desiredPlan, setDesiredPlan }) {
	const startLocation = desiredPlan.startLocation;

	return (
		<Layout>
			<Content>Start location data</Content>
			<Content>
				table
				<Button onClick={() => setDesiredPlan(desiredPlan)}></Button>
			</Content>
		</Layout>
	);
}
