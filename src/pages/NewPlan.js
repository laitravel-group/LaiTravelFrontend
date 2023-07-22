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
	const [placesData, setPlacesData] = useState({});
	// google map api
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const 

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
							setPlacesData={setPlacesData}
							mapInstance={mapInstance}
							setMapInstance={setMapInstance}
							mapApi={}
						/>
					</Content>
				</>
			)}

			{subPage === "plan" && (
				<NewPlanBuild
					cityLocation={cityLocation}
					dates={dates}
					placesData={placesData}
				/>
			)}
		</Layout>
	);
}
