import React, { useState } from "react";
import { Button, Layout, Modal, Tabs } from "antd";
import TripPlanPerDayView from "../TripPlanPerDayView";

export default function OptimizePlanModal({
	proposedPlans,
	tripPlan,
	setTripPlan,
	currentDay,
	open,
	setOpen,
}) {
	const [option, setOption] = useState("0");
	const items = proposedPlans?.map((proposedPlan, i) => {
		return {
			key: i,
			label: `Option ${i + 1}`,
			children: (
				<TripPlanPerDayView tripPlanDetailsPerDay={proposedPlan} />
			),
		};
	});

	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			footer={[
				<Button onClick={() => setOpen(false)}>Cancel</Button>,
				<Button
					type="primary"
					onClick={() => {
						const newTripPlan = { ...tripPlan };
						newTripPlan.details[currentDay] = proposedPlans[option];
						setTripPlan(newTripPlan);
						setOpen(false);
					}}
				>
					Set this as my plan for the day
				</Button>,
			]}
		>
			<Layout style={{ height: "100vh" }}>
				<h1>Select an option</h1>
				<Tabs
					defaultActiveKey="0"
					items={items}
					onChange={(key) => {
						setOption(key);
					}}
				/>
			</Layout>
		</Modal>
	);
}
