import React from "react";
import PlaceVisitEdit from "../components/new-plan/PlaceVisitEdit";
import { tripPlanJson } from "../models/testData";
import { TripPlan } from "../models/tripPlan";

export default function TestPage() {
	const tripPlan = TripPlan.fromJson(tripPlanJson);
	console.log(tripPlan);
	return (
		<>
			<PlaceVisitEdit tripPlan={tripPlan} day={1} />
		</>
	);
}
