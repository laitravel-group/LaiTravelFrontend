import React from "react";
import PlaceVisitEdit from "../components/new-plan/PlaceVisitEdit";
import { tripPlanJson } from "../models/testData";
import { TripPlan } from "../models/tripPlan";
import OptimizePlan from "../components/OptimizePlan";
import { recommendedPlacesJson } from "../models/testPlacesDataSydney";
import { Place } from "../models/place";
import Recommendations from "../components/new-plan/Recommendations";

export default function TestPage() {
	const recommendedPlaces = recommendedPlacesJson.places.map((place) => {
		return Place.fromJson(place);
	});

	return (
		<Recommendations
			recommendedPlaces={recommendedPlaces}
			addPlace={() => {}}
		/>
	);
}
