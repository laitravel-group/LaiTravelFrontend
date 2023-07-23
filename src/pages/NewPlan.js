import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NewPlanCreate from "../components/new-plan/NewPlanCreate";
import NewPlanBuild from "../components/new-plan/NewPlanBuild";

export default function NewPlan() {
	const location = useLocation();
	const propsFromLink = location.state;

	const [subPage, setSubPage] = useState(propsFromLink?.subPage ?? "search");
	const [cityLocation, setCityLocation] = useState({
		lat: null,
		lng: null,
	});
	const [dates, setDates] = useState(null);
	// recommendation from /places api
	const [recommendedPlaces, setRecommendedPlaces] = useState({});
	// google map api
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const googleMap = {
		mapInstance: mapInstance,
		setMapInstance: setMapInstance,
		mapApi: mapApi,
		setMapApi: setMapApi,
		mapApiLoaded: mapApiLoaded,
		setMapApiLoaded: setMapApiLoaded,
	};

	useEffect(() => {
		if (cityLocation.lat !== null && cityLocation.lng !== null) {
			setSubPage("planning");
		} else {
			setSubPage("search");
		}
	}, [cityLocation]);

	if (subPage === "search")
		return (
			<NewPlanCreate
				setCityLocation={setCityLocation}
				dates={dates}
				setDates={setDates}
				setRecommendedPlaces={setRecommendedPlaces}
				googleMap={googleMap}
			/>
		);
	else if (subPage === "planning")
		return (
			<NewPlanBuild
				cityLocation={cityLocation}
				dates={dates}
				recommendedPlaces={recommendedPlaces}
				setSubPage={setSubPage}
				googleMap={googleMap}
			/>
		);
}
