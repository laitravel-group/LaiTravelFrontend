import React from "react";
import { Tabs } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

export default function TripPlanTabs({ dates, setCurrentDay, tripPlan }) {
	const numDays = dates[1].diff(dates[0], "day") + 1;
	const items = new Array(numDays).fill(null).map((_, i) => {
		return {
			label: (
				<span>
					<CalendarOutlined />{" "}
					{dates[0].add(i, "day").format("MMM DD")}
				</span>
			),
			key: i,
			children: (
				<p style={{ minHeight: "400px" }}>
					Placeholder for tab content
				</p>
			),
		};
	});
	return (
		<Tabs
			defaultActiveKey="1"
			onChange={(activeKey) => {
				setCurrentDay(activeKey);
			}}
			items={items}
		/>
	);
}
