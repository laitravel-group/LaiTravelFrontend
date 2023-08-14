import React from "react";
import { Layout, Timeline, Tabs } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

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
			const timelineItems = detail.visits.map((visit, visitIndex) => {
				return {
					children: (
						<>
							<h4>
								{visit.startTime && visit.startTime.isValid()
									? `${visit.startTime.format(
											"HH:mm"
									  )} - ${visit.endTime.format("HH:mm")} `
									: "Not set yet"}
							</h4>
							<p>{visit.place.placeName}</p>
							<p>{visit.place.description}</p>
						</>
					),
				};
			});
			tabs.children = (
				<div>
					<h3>Date: {detail.date.format("YYYY-MM-DD")}</h3>
					<p>
						Start Location:{" "}
						{detail.startLocation?.placeName ?? "Custom Location"}
					</p>
					<p>
						Start Time:{" "}
						{detail.startTime?.format("HH:mm") ?? "Unset"}
					</p>
					<h4>Visits:</h4>
					<Timeline mode="alternate" items={timelineItems} />
				</div>
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
