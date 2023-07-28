import React from "react";
import NewPlanEx from "../exported/NewPlanEx";
import { tripPlanJson } from "../models/testData";
import { TripPlan } from "../models/tripPlan";

export default function TestPage() {
	const tripPlan = TripPlan.fromJson(tripPlanJson);
	console.log(tripPlan);
	return (
		<>
			<NewPlanEx />
		</>
	);
}
