import React from "react";
import { Layout, Tabs } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import TripPlanPerDayView from "./TripPlanPerDayView";

export default function TripPlanView({ tripPlan }) {
	const items = tripPlan.details.map((detail, i) => {
		const tabs = {
			key: i,
			label: (
				<span>
					<CalendarOutlined />
					{tripPlan.startDate.add(i, "day").format("MMM DD")}
				</span>
			),
		};
		if (detail.visits.length !== 0) {
			tabs.children = (
				<TripPlanPerDayView tripPlanDetailsPerDay={detail} />
			);
		} else {
			tabs.children = (
				<div style={{ fontWeight: "bolder" }}>
					There are currently no plan for this date.
				</div>
			);
		}
		return tabs;
	});

	return (
		<Layout style={{ height: "100vh" }}>
			<h1>My Plan</h1>
			<Tabs defaultActiveKey="0" items={items} />
		</Layout>
	);
}
