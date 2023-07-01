import React, { useEffect, useState } from "react";
import { Layout, Tabs } from "antd";
import PageHeader from "../components/PageHeader";
import SimpleMap from "../components/CreatePlanContent";
import InitCity from "../components/InitCity";

const { Content } = Layout;
const { TabPane } = Tabs;
const tabKeys = {
	InitSearch: "initSearch",
	TravelPlanner: "travelPlanner",
};

export default function NewPlan() {
	const [startCity, setStartCity] = useState({
		lat: 0,
		lng: 0,
	});
	const [date, setDate] = useState(null);
	const [tabKey, setTabKey] = useState({ reset: false });
	const [key, setKey] = useState(tabKeys.InitSearch);

	useEffect(() => {
		if (startCity.lat !== 0 && startCity.lng !== 0) {
			setKey(tabKeys.TravelPlanner);
		}
		if (tabKey.reset) {
			setKey(tabKeys.InitSearch);
			tabKey.reset = false;
		}
	}, [startCity, tabKey]);
	return (
		<Layout style={{ height: "100vh" }}>
			<PageHeader />
			<Content
				style={{
					height: "calc(100% - 64px)",
					width: "100%",
					padding: 0,
					overflowY: "auto",
				}}
			>
				<Tabs
					defaultActiveKey={tabKeys.InitSearch}
					activeKey={key}
					destroyInactiveTabPane={true}
					tabBarStyle={{ bottom: "100vh" }}
					tabPosition={"bottom"}
				>
					<TabPane tab="InitSearch" key={tabKeys.InitSearch}>
						<InitCity
							setStartCity={setStartCity}
							date={date}
							setDate={setDate}
						/>
					</TabPane>
					<TabPane tab="TravelPlanner" key={tabKeys.TravelPlanner}>
						<SimpleMap
							initCity={startCity}
							date={date}
							reset={setTabKey}
						/>
					</TabPane>
				</Tabs>
			</Content>
		</Layout>
	);
}
