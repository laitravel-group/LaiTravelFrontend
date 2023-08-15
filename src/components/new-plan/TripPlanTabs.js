import React from "react";
import { Tabs } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import PlaceVisitEdit from "./PlaceVisitEdit";

export default function TripPlanTabs({
	dates,
	currentDay,
	setCurrentDay,
	tripPlan,
	setTripPlan,
}) {
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
				<PlaceVisitEdit
					tripPlan={tripPlan}
					setTripPlan={setTripPlan}
					currentDay={currentDay}
				/>
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
