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
import {google_api_key} from "../../api";
import ScrollableBox from "../ScrollableBox";
import TripPlanTabs from "./TripPlanTabs";
import SearchBox from "./SearchBox";
import { TripPlan } from "../../models/tripPlan";
import MyPlans from "../MyPlan";
import { tripPlanJson } from "../../models/testData";

const apiKey = google_api_key;

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

	// states
	const [mapCenter, setMapCenter] = useState({
		lat: city.lat,
		lng: city.lng,
	});

	const [placesSearchResult, setPlacesSearchResult] = useState([]);

	const [tripPlan, setTripPlan] = useState(
		TripPlan.init(city.placeId, city.placeName, dates[0], dates[1])
	);
	const [previewModalOpen, setPreviewModalOpen] = useState(false);

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
		setTripPlan(TripPlan.fromJson(tripPlanJson));
	}, []);

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
							>
								<CalendarOutlined />
								Optimise Trip Plan
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
				</Content>
			</Layout>
		</Layout>
	);

	/*
	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "100vh" }}>
			<Layout hasSider>
				<Sider
					style={{
						overflow: "auto",
						height: "100vh",
						position: "fixed",
						left: 0,
						top: 0,
						bottom: 0,
						theme: "light",
					}}
					width={"calc(100% - 928px)"}
				>
					<div
						className="site-layout-background"
						style={{
							height: "100%",
							width: "100%",
							padding: 0,
							textAlign: "left",
						}}
					>
						<GoogleMap
							apiKey={apiKey}
							onChange={handleCenterChange}
							defaultCenter={defaultProps.center}
							defaultZoom={defaultProps.zoom}
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={({ map, maps }) =>
								apiHasLoaded(map, maps)
							}
						></GoogleMap>
					</div>
				</Sider>
				<Layout
					className="site-layout"
					style={{ marginLeft: "calc(100% - 828px)" }}
				>
					<PageHeader />
					<Content>
						<Input.Group compact>
							<Input
								style={{ width: 240 }}
								placeholder="Search nearby by keyword"
								value={searchKeyword}
								onChange={(e) =>
									setSearchKeyword(e.target.value)
								}
								onPressEnter={() => findMultiLocation()}
							/>
							<Button
								style={{ width: 80 }}
								type="primary"
								onClick={findMultiLocation}
							>
								Search
							</Button>
							<AutoComplete
								value={autoInput}
								options={autoList}
								style={{ width: 428 }}
								onSelect={onSelect}
								onSearch={onSearch}
								onChange={onChange}
								placeholder="Search place name"
							/>
							<Button
								style={{ width: 80 }}
								type="primary"
								onClick={findLocation}
							>
								Search
							</Button>
						</Input.Group>
					</Content>
					<Content>
						<ScrollableBox style={{ height: "400px" }}>
							<Layout>
								<Content>
									<Table
										columns={columnsSearch}
										expandable={{
											expandedRowRender:
												expandedSearchRowRender,
											defaultExpandedRowKeys: ["0"],
										}}
										dataSource={dataSearch}
										pagination={false}
									/>
									<Table
										columns={columns}
										expandable={{
											expandedRowRender,
										}}
										dataSource={data}
										pagination={false}
									/>
								</Content>
								<Footer
									style={{
										textAlign: "center",
									}}
								>
									<Button
										type="primary"
										onClick={handleReset}
									>
										Reset Travel Plan
									</Button>
									<Button type="primary" onClick={() => {}}>
										Save This Travel Plan!
									</Button>
								</Footer>
							</Layout>
						</ScrollableBox>
					</Content>
				</Layout>
			</Layout>
		</div>
	);*/
}
