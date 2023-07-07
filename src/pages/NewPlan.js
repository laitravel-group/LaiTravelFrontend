import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Layout } from "antd";
import PageHeader from "../components/PageHeader";
import NewPlanCreate from "../components/NewPlanCreate";
import NewPlanBuild from "../components/NewPlanBuild";

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
