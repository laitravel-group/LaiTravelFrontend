import React, { useEffect, useState } from "react";
import {
	App as AntdApp,
	Button,
	Layout,
	Modal,
	Row,
	Col,
	Collapse,
} from "antd";
import { ExclamationCircleFilled, CalendarOutlined } from "@ant-design/icons";
import GoogleMap from "google-maps-react-markers";
import PageHeader from "../PageHeader";
import ScrollableBox from "../ScrollableBox";
import TripPlanTabs from "./TripPlanTabs";
import SearchBox from "./SearchBox";
import MyPlans from "../MyPlan";
import OptimizePlan from "../OptimizePlan";
import { TripPlan } from "../../models/tripPlan";
import { tripPlanJson } from "../../models/testData";
import apiKey from "../../key";

const { Content, Footer, Sider } = Layout;
const colors = [
	"pink",
	"lime",
	"yellow",
	"blue",
	"orange",
	"cyan",
	"purple",
	"magenta",
	"green",
	"red",
	"geekblue",
	"volcano",
	"gold",
];

export default function NewPlanBuild(props) {
	const { dates, city, recommendedPlaces } = props;
	//console.log(recommendedPlaces);

	// google map api
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [placesService, setplacesService] = useState(null);
	const [autocompleteService, setAutocompleteService] = useState(null);
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const googleMap = {
		mapInstance: mapInstance,
		mapApi: mapApi,
		placesService: placesService,
		autocompleteService: autocompleteService,
		mapApiLoaded: mapApiLoaded,
	};
	const [mapCenter, setMapCenter] = useState({
		lat: city.lat,
		lng: city.lng,
	});

	// states

	const [placesSearchResult, setPlacesSearchResult] = useState([]);
	const [tripPlan, setTripPlan] = useState(
		//TripPlan.init(city.placeId, city.placeName, dates[0], dates[1])
		TripPlan.fromJson(tripPlanJson)
	);
	const [currentDay, setCurrentDay] = useState(0);
	const [tripPlanOnCurrentDay, setTripPlanOnCurrentDay] = useState(
		tripPlan[currentDay]
	);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);

	const { modal } = AntdApp.useApp();

	useEffect(() => {
		if (mapApiLoaded) {
			setAutocompleteService(
				new mapApi.places.AutocompleteService(mapInstance)
			);
			setplacesService(new mapApi.places.PlacesService(mapInstance));
		}
	}, [mapInstance]);

	const handleCenterChange = () => {
		if (mapApiLoaded) {
			setMapCenter({
				lat: mapInstance.center.lat(),
				lng: mapInstance.center.lng(),
			});
		}
	};

	//debug
	useEffect(() => {
		setTripPlanOnCurrentDay(tripPlan.details[currentDay]);
	}, [currentDay]);

	return (
		<Layout
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100vh",
			}}
			hasSider
		>
			<Sider width={"calc(100% - 928px)"} theme="light">
				<GoogleMap
					apiKey={apiKey}
					defaultCenter={{ lat: city.lat, lng: city.lng }}
					defaultZoom={11}
					yesIWantToUseGoogleMapApiInternals
					onChange={handleCenterChange}
					onGoogleApiLoaded={({ map, maps }) => {
						setMapInstance(map);
						setMapApi(maps);
						setMapApiLoaded(true);
					}}
				></GoogleMap>
			</Sider>
			<Layout style={{ marginLeft: "15px", marginRight: "100px" }}>
				<PageHeader />
				<Content>
					<ScrollableBox>
						<Collapse
							className="collapse-box"
							defaultActiveKey={["recommendations", "plan"]}
							size="large"
							ghost
							items={[
								{
									key: "recommendations",
									label: "Explore",
									children: (
										<p>Placeholder for Recommendations</p>
									),
								},
								{
									key: "plan",
									label: "Places to Visit",
									children: (
										<TripPlanTabs
											dates={dates}
											setCurrentDay={setCurrentDay}
											tripPlan={tripPlan}
										/>
									),
								},
							]}
						/>
					</ScrollableBox>
				</Content>
				<Content>
					<Row>
						<Col span={8} style={{ textAlign: "center" }}>
							<Button
								type="primary"
								onClick={() => {}}
								style={{ marginRight: "40px" }}
							>
								Save
							</Button>
							<Button
								onClick={() =>
									modal.confirm({
										icon: <ExclamationCircleFilled />,
										title: "Are you sure to reset your travel plan?",
										content:
											"You will lose all your plan data!",
										onOk() {
											props.setSubPage("search");
										},
									})
								}
							>
								Reset
							</Button>
						</Col>
						<Col
							span={12}
							offset={4}
							style={{ textAlign: "right" }}
						>
							<Button
								type="link"
								onClick={() => setPreviewModalOpen(true)}
							>
								Preview
							</Button>
							<Button
								type="primary"
								style={{ marginRight: "20px" }}
								onClick={() => setOptimizeModalOpen(true)}
							>
								<CalendarOutlined />
								Optimize Trip Plan
							</Button>
						</Col>
					</Row>
					<Modal
						open={previewModalOpen}
						onCancel={() => setPreviewModalOpen(false)}
						footer={null}
					>
						<MyPlans tripPlan={tripPlan} />
					</Modal>
					<Modal
						open={optimizeModalOpen}
						onCancel={() => setOptimizeModalOpen(false)}
					>
						<OptimizePlan
							desiredPlan={tripPlanOnCurrentDay}
							setTripPlanOnCurrentDay={setTripPlanOnCurrentDay}
						/>
					</Modal>
				</Content>
			</Layout>
		</Layout>
	);
}
