import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Layout } from "antd";
import PageHeader from "../components/PageHeader";
import NewPlanCreate from "../components/new-plan/NewPlanCreate";
import NewPlanBuild from "../components/new-plan/NewPlanBuild";

const { Content } = Layout;

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
			setSubPage("plan");
		} else {
			setSubPage("search");
		}
	}, [cityLocation]);
	return (
		<Layout style={{ height: "100vh" }}>
			{subPage === "search" && (
				<>
					<PageHeader />
					<Content>
						<NewPlanCreate
							setCityLocation={setCityLocation}
							dates={dates}
							setDates={setDates}
							setPlacesData={setRecommendedPlaces}
							googleMap={googleMap}
						/>
					</Content>
				</>
			)}

			{subPage === "plan" && (
				<NewPlanBuild
					cityLocation={cityLocation}
					dates={dates}
					recommendedPlaces={recommendedPlaces}
				/>
			)}
		</Layout>
	);
}
