import React, { useEffect, useState } from "react";
import { Layout, Tabs } from "antd";
import PageHeader from "../components/PageHeader";
import SimpleMap from "../components/CreatePlanContent";
import NewPlanSearchBar from "../components/NewPlanSearchBar";
import { useLocation } from "react-router";

const { Content } = Layout;

export default function NewPlan() {
	const location = useLocation();
	const propsFromLink = location.state;
	const [subPage, setSubPage] = useState(propsFromLink?.subPage ?? "search");

	const [cityLocation, setCityLocation] = useState({
		lat: 0,
		lng: 0,
	});
	const [date, setDate] = useState(null);

	useEffect(() => {
		if (cityLocation.lat !== 0 && cityLocation.lng !== 0) {
			setSubPage("plan");
		} else {
			setSubPage("search");
		}
	}, [cityLocation]);
	return (
		<Layout style={{ height: "100vh" }}>
			{subPage == "search" && (
				<>
					<PageHeader />
					<Content>
						<NewPlanSearchBar
							setCityLocation={setCityLocation}
							date={date}
							setDate={setDate}
						/>
					</Content>
				</>
			)}

			{subPage == "plan" && (
				<SimpleMap initCity={cityLocation} date={date} />
			)}
		</Layout>
	);
}
