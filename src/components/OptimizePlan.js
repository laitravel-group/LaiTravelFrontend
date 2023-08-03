import React, { useEffect, useState } from "react";
import { Layout, Timeline } from "antd";
import dayjs from "dayjs";
import { TripPlanDetailsPerDay } from "../models/tripPlanDetailsPerDay";
import { buildTripPlan, saveTripPlan } from "../api";

export default function OptimizePlan({ desiredPlan, setTripPlanOnCurrentDay }) {
	const [proposedPlans, setProposedPlans] = useState([]);
	/* const handleSave = (plan) => {
		saveTripPlan(plan)
			.then(() => {
				console.log("Trip plan saved successfully!");
			})
			.catch((error) => {
				console.error("Failed to save the trip plan:", error);
			});
	}; */

	useEffect(() => {
		setProposedPlans([]);
		buildTripPlan(desiredPlan.toJson())
			.then((data) => {
				const newProposedPlans = data.proposed_plans.map((plan) =>
					TripPlanDetailsPerDay.fromJson(plan)
				);
				setProposedPlans(newProposedPlans);
			})
			.catch((error) => {
				console.error("Failed to generate a trip plan:", error);
			});
	}, [desiredPlan]);

	return (
		<Layout style={{ height: "100vh" }}>
			{proposedPlans.length > 0 ? (
				<div>
					<h3>
						Date:{" "}
						{dayjs(proposedPlans[0].date).format("YYYY-MM-DD")}
					</h3>
					<p>
						Start Location:{" "}
						{proposedPlans[0].startLocation.placeName}
					</p>
					<p>
						Start Time:{" "}
						{dayjs(proposedPlans[0].startTime).format("HH:mm")}
					</p>
					<h4>Visits:</h4>
					<Timeline mode="alternate">
						{proposedPlans[0].visits.map((visit, i) => (
							<Timeline.Item key={i}>
								<h4>
									{dayjs(visit.startTime).format("HH:mm")} -
									{dayjs(visit.endTime).format("HH:mm")}
								</h4>
								<p>{visit.place.placeName}</p>
							</Timeline.Item>
						))}
					</Timeline>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</Layout>
	);
}
