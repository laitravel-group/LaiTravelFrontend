import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NewPlanCreate from "../components/new-plan/NewPlanCreate";
import NewPlanBuild from "../components/new-plan/NewPlanBuild";
import { Place } from "../models/place";
import { getPlaces } from "../api";

export default function NewPlan() {
	const location = useLocation();
	const propsFromLink = location.state;

	const [subPage, setSubPage] = useState(propsFromLink?.subPage ?? "search");
	const [city, setCity] = useState(null);
	// start and end dates
	const [dates, setDates] = useState(null);
	// recommendation from /places api
	const [recommendedPlaces, setRecommendedPlaces] = useState({});
	useEffect(() => {
		if (city !== null) {
			/* getPlaces(
				city.placeName,
				dates[0].format("YYYY-MM-DD"),
				dates[1].format("YYYY-MM-DD")
			).then((data) => {
				setRecommendedPlaces(
					data?.places?.map((place) => Place.fromJson(place))
				);
			}); */
			setRecommendedPlaces([]);
		}
	}, [city]);

	useEffect(() => {
		if (city !== null) {
			setSubPage("planning");
		} else {
			setSubPage("search");
		}
	}, [recommendedPlaces]);

	if (subPage === "search") {
		return (
			<NewPlanCreate
				dates={dates}
				setDates={setDates}
				city={city}
				setCity={setCity}
				setRecommendedPlaces={setRecommendedPlaces}
			/>
		);
	} else if (subPage === "planning") {
		return (
			<NewPlanBuild
				dates={dates}
				city={city}
				recommendedPlaces={recommendedPlaces}
				setSubPage={setSubPage}
			/>
		);
	}
}
