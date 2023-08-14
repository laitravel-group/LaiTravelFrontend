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
import TripPlanView from "../TripPlanView";
import OptimizePlanModal from "./OptimizePlanModal";
import { TripPlan } from "../../models/tripPlan";
import { TripPlanDetailsPerDay } from "../../models/tripPlanDetailsPerDay";
import { tripPlanJson } from "../../models/testData";
import apiKey from "../../key";
import Recommendations from "./Recommendations";
import { buildTripPlan } from "../../api";

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
		tripPlan.details[currentDay]
	);
	const [proposedPlansOnCurrentDay, setProposedPlansForCurrentDay] =
		useState();
	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
	const [optimizeLoading, setOptimizeLoading] = useState(false);

	const { modal } = AntdApp.useApp();

	const handleCenterChange = () => {
		if (mapApiLoaded) {
			setMapCenter({
				lat: mapInstance.center.lat(),
				lng: mapInstance.center.lng(),
			});
		}
	};

	const addPlace = (place) => {
		const updatedTripPlan = { ...TripPlan };
		updatedTripPlan.details[currentDay].visits.push(place);
		setTripPlan(updatedTripPlan);
	};

	const handleOptimizePlan = () => {
		setOptimizeLoading(true);

		const desiredPlan = tripPlanOnCurrentDay;
		buildTripPlan(desiredPlan.toJson())
			.then((data) => {
				const newProposedPlans = data.proposed_plans.map((plan) =>
					TripPlanDetailsPerDay.fromJson(plan)
				);
				setProposedPlansForCurrentDay(newProposedPlans);
				setOptimizeLoading(false);
				setOptimizeModalOpen(true);
			})
			.catch((error) => {
				console.error("Failed to generate a trip plan:", error);
			});
	};

	useEffect(() => {
		if (mapApiLoaded) {
			setAutocompleteService(
				new mapApi.places.AutocompleteService(mapInstance)
			);
			setplacesService(new mapApi.places.PlacesService(mapInstance));
		}
	}, [mapInstance]);

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
										<Recommendations
											recommendedPlaces={
												recommendedPlaces
											}
											addPlace={addPlace}
										/>
									),
								},
								{
									key: "plan",
									label: "Places to Visit",
									children: (
										<TripPlanTabs
											dates={dates}
											currentDay={currentDay}
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
								onClick={handleOptimizePlan}
								icon={<CalendarOutlined />}
								loading={optimizeLoading}
							>
								Optimize Trip Plan
							</Button>
						</Col>
					</Row>
					<Modal
						open={previewModalOpen}
						onCancel={() => setPreviewModalOpen(false)}
						footer={null}
					>
						<TripPlanView tripPlan={tripPlan} />
					</Modal>
					<OptimizePlanModal
						open={optimizeModalOpen}
						setOpen={setOptimizeModalOpen}
						proposedPlans={proposedPlansOnCurrentDay}
						tripPlan={tripPlan}
						setTripPlan={setTripPlan}
						currentDay={currentDay}
					/>
				</Content>
			</Layout>
		</Layout>
	);
}
