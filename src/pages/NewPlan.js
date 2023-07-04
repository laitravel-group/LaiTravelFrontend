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
		lat: 0,
		lng: 0,
	});
	const [dates, setDates] = useState(null);

	useEffect(() => {
		if (cityLocation.lat !== 0 && cityLocation.lng !== 0) {
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
						/>
					</Content>
				</>
			)}

			{subPage === "plan" && (
				<NewPlanBuild cityLocation={cityLocation} dates={dates} />
			)}
		</Layout>
	);
}
