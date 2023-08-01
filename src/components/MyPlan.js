import React from "react";
import { Layout, Timeline, Tabs } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default function MyPlans({ tripPlan }) {
	return (
		<Layout style={{ height: "100vh" }}>
			<h1>My Plan</h1>
			<Tabs>
				{tripPlan.details.map((detail, i) => (
					<TabPane
						tab={
							<span>
								<CalendarOutlined />
								{tripPlan.startDate
									.add(i, "day")
									.format("MMM DD")}
							</span>
						}
						key={i}
					>
						<div>
							<h3>Date: {detail.date.format("YYYY-MM-DD")}</h3>
							<p>
								Start Location: {detail.startLocation.placeName}
							</p>
							<p>
								Start Time: {detail.startTime.format("HH:mm")}
							</p>
							<h4>Visits:</h4>
							<Timeline mode="alternate">
								{detail.visits.map((visit, visitIndex) => (
									<Timeline.Item key={visitIndex}>
										<h4>
											{visit.startTime &&
											visit.startTime.isValid()
												? `${visit.startTime.format(
														"HH:mm"
												  )} - ${visit.endTime.format(
														"HH:mm"
												  )} `
												: "Not set yet"}
										</h4>
										<p>{visit.place.placeName}</p>
										<p>{visit.place.description}</p>
									</Timeline.Item>
								))}
							</Timeline>
						</div>
					</TabPane>
				))}
			</Tabs>
		</Layout>
	);
}
