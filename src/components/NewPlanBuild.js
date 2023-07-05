import React, { useEffect, useState } from "react";
import {
	AutoComplete,
	Badge,
	Button,
	Dropdown,
	Input,
	Layout,
	notification,
	Space,
	Table,
	TimePicker,
} from "antd";
import {
	CalendarOutlined,
	DeleteOutlined,
	DownOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	FieldNumberOutlined,
	ScheduleOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import GoogleMap from "google-maps-react-markers";
import { cloneDeep } from "lodash";
import PageHeader from "./PageHeader";
import { apiKey } from "../key";

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

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function NewPlanBuild(props) {
	const { cityLocation, dates } = props;

	const [myPosition, setMyPosition] = useState({
		lat: cityLocation.lat,
		lng: cityLocation.lng,
	});
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [places, setPlaces] = useState([]);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [autoInput, setAutoInput] = useState("");
	const [autoList, setAutoList] = useState([]);
	const [markers, setMarkers] = useState([]);

	// days in trip

	let infowindow;
	// initialise array of daily plans
	const initPlanData = (days) => {
		let plans = [];
		for (let i = 0; i < days; i++) {
			plans.push([]);
		}
		return plans;
	};
	const numDays = dates[1].diff(dates[0], "day") + 1;
	const [planData, setPlanData] = useState(initPlanData(numDays));

	const recommendation = [
		{
			key: "0",
			place: "First Place Name",
			time: dates[0].hour(11).minute(30),
			duration: dates[0].hour(3).minute(0),
		},
		{
			key: "1",
			place: "Second Place Name",
			time: dates[0].hour(23).minute(30),
			duration: dates[0].hour(3).minute(0),
		},
	];

	const items1 = [];
	for (let i = 0; i < numDays; i++) {
		items1.push({
			key: i.toString(),
			label: (
				<span>
					<CalendarOutlined />{" "}
					{[dates[0].add(i, "day").format("MMM Do")]}
				</span>
			),
		});
	}
	const items2 = [
		{
			key: "1",
			label: "Set as start",
		},
		{
			key: "2",
			label: "Open on map",
		},
		{
			key: "3",
			label: (
				<a>
					{" "}
					Delete <DeleteOutlined />
				</a>
			),
		},
	];
	const items3 = [
		{
			key: "1",
			label: (
				<a>
					Show <EyeOutlined />
				</a>
			),
		},
		{
			key: "2",
			label: (
				<a>
					Hide <EyeInvisibleOutlined />
				</a>
			),
		},
	];

	const expandedRowRender = (row) => {
		const columns = [
			{
				title: (
					<Badge
						key={colors[row.key % colors.length]}
						color={colors[row.key % colors.length]}
					/>
				),
				key: "index",
				render: (record) => {
					return (
						<Space.Compact block>
							<FieldNumberOutlined />
							{parseInt(record.key) + 1}
						</Space.Compact>
					);
				},
			},
			{
				title: "Place",
				dataIndex: "place",
				key: "place",
				width: "100%",
			},
			{
				title: "Start Time",
				key: "start_time",
				render: (record) => {
					return (
						<Space style={{ width: 100 }}>
							<TimePicker
								style={{ width: 100 }}
								format="h:mm A"
								allowClear={false}
								showNow={false}
								value={record.time}
								onChange={(e) => {
									const newPlans = cloneDeep(planData);
									newPlans[row.key][record.key].time = e;
									setPlanData(newPlans);
								}}
							/>
						</Space>
					);
				},
			},
			{
				title: "Duration",
				key: "stay_duration",
				render: (record) => {
					return (
						<Space style={{ width: 80 }}>
							<TimePicker
								style={{ width: 80 }}
								format="H:mm"
								allowClear={false}
								showNow={false}
								value={record.duration}
								onChange={(e) => {
									const newPlans = cloneDeep(planData);
									newPlans[row.key][record.key].duration = e;
									setPlanData(newPlans);
								}}
							/>
						</Space>
					);
				},
			},
			{
				title: "Action",
				key: "operation",
				render: (record) => {
					return (
						<Space style={{ width: 165 }}>
							<Dropdown
								menu={{
									items: items2,
									onClick: (e) => {
										console.log(e);
										if (e.key === "1") {
											const newPlans =
												cloneDeep(planData);
											const moving = newPlans[
												row.key
											].splice(record.key, 1);
											newPlans[row.key].unshift(
												moving[0]
											);
											for (
												let i = 0;
												i < newPlans[row.key].length;
												i++
											) {
												newPlans[row.key][i].key =
													i.toString();
											}
											setPlanData(newPlans);
										}
										if (e.key === "3") {
											const newPlans =
												cloneDeep(planData);
											newPlans[row.key].splice(
												record.key,
												1
											);
											for (
												let i = 0;
												i < newPlans[row.key].length;
												i++
											) {
												newPlans[row.key][i].key =
													i.toString();
											}
											setPlanData(newPlans);
										}
									},
								}}
							>
								<a>
									Options <DownOutlined />
								</a>
							</Dropdown>
							<Dropdown
								menu={{
									items: items1,
									onClick: (e) => {
										const newPlans = cloneDeep(planData);
										const moving =
											newPlans[row.key][record.key];
										newPlans[row.key].splice(record.key, 1);
										newPlans[e.key].push(moving);
										for (
											let i = 0;
											i < newPlans[row.key].length;
											i++
										) {
											newPlans[row.key][i].key =
												i.toString();
										}
										for (
											let i = 0;
											i < newPlans[e.key].length;
											i++
										) {
											newPlans[e.key][i].key =
												i.toString();
										}
										setPlanData(newPlans);
									},
								}}
							>
								<span onClick={(e) => e.preventDefault()}>
									Move to <DownOutlined />
								</span>
							</Dropdown>
						</Space>
					);
				},
			},
		];

		let inTable = planData[row.key];
		return (
			<Table columns={columns} dataSource={inTable} pagination={false} />
		);
	};
	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Action",
			key: "operation",
			render: () => (
				<Space size="middle">
					<Dropdown
						menu={{
							items: items3,
						}}
					>
						<a>
							Pins on map <DownOutlined />
						</a>
					</Dropdown>
					<a>
						Arrange schedule for today <ScheduleOutlined />
					</a>
				</Space>
			),
		},
	];
	const data = [];
	for (let i = 0; i < numDays; ++i) {
		data.push({
			key: i.toString(),
			date: (
				<span>
					<CalendarOutlined />{" "}
					{[dates[0].add(i, "day").format("dddd, MMM Do")]}
				</span>
			),
		});
	}
	const expandedSearchRowRender = (row) => {
		const columns = [
			{
				title: "Place",
				dataIndex: "place",
				key: "place",
				width: "100%",
			},
			{
				title: "Action",
				key: "operation",
				render: (record) => {
					return (
						<Space style={{ width: 195 }}>
							<a>Open on map</a>
							<span> </span>
							<Dropdown
								menu={{
									items: items1,
									onClick: (e) => {
										const newPlans = cloneDeep(planData);
										const moving =
											placesData[row.key][record.key];
										moving.time = dates[0]
											.hour(8)
											.minute(0);
										moving.duration = dates[0]
											.hour(3)
											.minute(0);
										moving.marker = cloneDeep(
											markers[record.key]
										);
										newPlans[e.key].push(moving);
										for (
											let i = 0;
											i < newPlans[e.key].length;
											i++
										) {
											newPlans[e.key][i].key =
												i.toString();
											newPlans[e.key][
												i
											].marker.label = `${i + 1}`;
											newPlans[e.key][i].marker.setMap(
												mapInstance
											);
										}
										console.log(newPlans);
										setPlanData(newPlans);
									},
								}}
							>
								<span onClick={(e) => e.preventDefault()}>
									Move to <DownOutlined />
								</span>
							</Dropdown>
						</Space>
					);
				},
			},
		];
		const placesData = [];

		while (placesData.length < 2) {
			placesData.push([]);
		}
		for (let i = 0; i < places.length; i++) {
			placesData[1].push({
				key: i.toString(),
				place: places[i].name,
			});
		}
		placesData[0] = recommendation;

		let inTable = placesData[row.key];
		return (
			<Table columns={columns} dataSource={inTable} pagination={false} />
		);
	};
	const columnsSearch = [
		{
			title: "Place",
			dataIndex: "place",
			key: "place",
		},
		{
			title: "Action",
			key: "operation",
			render: () => (
				<Space size="middle">
					<Dropdown
						menu={{
							items: items3,
						}}
					>
						<a>
							Pins on map <DownOutlined />
						</a>
					</Dropdown>
				</Space>
			),
		},
	];
	const dataSearch = [
		{
			key: "0",
			place: (
				<span>
					<SearchOutlined /> Recommendation
				</span>
			),
		},
		{
			key: "1",
			place: (
				<span>
					<SearchOutlined /> Search Results
				</span>
			),
		},
	];

	if (mapApiLoaded) {
		infowindow = new mapApi.InfoWindow();
	}

	const defaultProps = {
		center: {
			lat: cityLocation.lat,
			lng: cityLocation.lng,
		},
		zoom: 11,
	};

	const apiHasLoaded = (map, maps) => {
		setMapInstance(map);
		setMapApi(maps);
		setMapApiLoaded(true);
	};

	const handleReset = () => {
		props.reset({
			reset: true,
		});
	};

	const handleCenterChange = () => {
		if (mapApiLoaded) {
			setMyPosition({
				lat: mapInstance.center.lat(),
				lng: mapInstance.center.lng(),
			});
		}
	};

	const findMultiLocation = () => {
		if (mapApiLoaded) {
			const service = new mapApi.places.PlacesService(mapInstance);

			const request = {
				location: myPosition,
				radius: 30000,
				keyword:
					searchKeyword === "" ? "famous travel spot" : searchKeyword,
				rankBy: mapApi.places.RankBy.PROMINENCE,
			};

			service.nearbySearch(request, (results, status) => {
				if (
					status === mapApi.places.PlacesServiceStatus.OK &&
					results
				) {
					console.log(results);
					console.log(places);
					setPlaces(results);
					deleteMarkers();
					for (let i = 0; i < results.length; i++) {
						createMarker(results[i], i, mapInstance);
					}
					return;
				}
				console.log("error");
				openNotification();
			});
		}
	};
	function createMarker(place, i, map) {
		if (!place.geometry || !place.geometry.location) return;

		let photos = place.photos;
		let contentString;

		contentString =
			photos !== undefined
				? '<div id="content">' +
				  '<h1 id="firstHeading" class="firstHeading">' +
				  place.name +
				  "</h1>" +
				  '<div id="bodyContent">' +
				  '<img src="' +
				  photos[0].getUrl({ maxWidth: 500, maxHeight: 500 }) +
				  '" alt="" width="500" height="500">' +
				  "</div>" +
				  "</div>"
				: '<div id="content">' +
				  '<h1 id="firstHeading" class="firstHeading">' +
				  place.name +
				  "</h1>" +
				  '<div id="bodyContent">' +
				  '<h1 id="secondHeading" class="secondHeading">' +
				  "NO IMAGE AVAILABLE" +
				  "</h1>" +
				  "</div>" +
				  "</div>";

		const marker = new mapApi.Marker({
			position: place.geometry.location,
			map,
			title: place.name,
			label: `${i + 1}`,
			optimized: false,
			content: contentString,
		});
		setMarkers((markers) => [...markers, marker]);

		marker.addListener("click", () => {
			infowindow.close();
			infowindow.setContent(marker.content);
			infowindow.open(marker.getMap(), marker);
		});
	}

	function hideMarkers() {
		for (let i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}
	function deleteMarkers() {
		hideMarkers();
		setMarkers([]);
	}

	const handleAutocomplete = () => {
		if (mapApiLoaded) {
			const service = new mapApi.places.AutocompleteService();
			const request = {
				input: autoInput,
			};

			service.getPlacePredictions(request, (results) => {
				if (!results) {
					setAutoList([]);
					return;
				}
				const descriptions = results.map((result) => {
					return {
						value: result.description,
					};
				});
				setAutoList(descriptions);
				console.log(results);
			});
		}
	};

	const onSearch = (searchText) => {
		console.log("Searched text: " + searchText);
	};
	const onSelect = (data) => {
		setAutoInput(data);
	};
	const onChange = (data) => {
		setAutoInput(data);
	};
	useEffect(() => {
		handleAutocomplete();
		if (!autoInput) {
			setAutoList([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoInput]);

	const findLocation = () => {
		if (mapApiLoaded) {
			const service = new mapApi.places.PlacesService(mapInstance);

			const request = {
				query: autoInput,
				fields: [
					"business_status",
					"geometry",
					"html_attributions",
					"icon",
					"icon_background_color",
					"icon_mask_base_uri",
					"name",
					"opening_hours",
					"photos",
					"place_id",
					"plus_code",
					"rating",
					"reference",
					"types",
					"user_ratings_total",
				],
			};

			service.findPlaceFromQuery(request, (results, status) => {
				if (
					status === mapApi.places.PlacesServiceStatus.OK &&
					results
				) {
					console.log(results);
					console.log(places);
					setPlaces(results);
					deleteMarkers();
					for (let i = 0; i < results.length; i++) {
						createMarker(results[i], i, mapInstance);
					}
					return;
				}
				console.log("error");
				openNotification();
			});
		}
	};

	const openNotification = () => {
		notification.open({
			message: "No result found",
			description: "Please try another keyword or enter valid name",
		});
	};

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
						>
							<AnyReactComponent
								lat={myPosition.lat}
								lng={myPosition.lng}
								text="Search Nearby Places Around Here!"
							/>
						</GoogleMap>
					</div>
				</Sider>
				<Layout
					className="site-layout"
					style={{ marginLeft: "calc(100% - 828px)" }}
				>
					<div
						style={{
							position: "fixed",
							top: 8,
							right: 100,
							zIndex: 1,
							width: 828,
						}}
					>
						<PageHeader />
					</div>
					<Input.Group compact>
						<div
							style={{
								position: "fixed",
								top: 148,
								zIndex: 1,
								width: "100%",
							}}
						>
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
						</div>
					</Input.Group>
					<Content
						style={{
							margin: "32px 16px 0",
							overflow: "initial",
						}}
					>
						<Table
							columns={columnsSearch}
							expandable={{
								expandedRowRender: expandedSearchRowRender,
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
						<Button type="primary" onClick={handleReset}>
							Reset Travel Plan
						</Button>
						<Button type="primary" onClick={() => {}}>
							Save This Travel Plan!
						</Button>
					</Footer>
				</Layout>
			</Layout>
		</div>
	);
}
