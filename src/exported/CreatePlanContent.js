import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { cloneDeep } from "lodash";
import {
	AutoComplete,
	Badge,
	Button,
	Drawer,
	Dropdown,
	Input,
	Layout,
	notification,
	Popconfirm,
	Space,
	Table,
	TimePicker,
	Typography,
} from "antd";
import { apiKey } from "../key";
import GoogleMap from "google-maps-react-markers";
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
// import { buildTripPlan, saveTripPlan } from "../api";

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

const CreatePlanContent = (props) => {
	const [myPosition, setMyPosition] = useState({
		lat: props.initCity.lat,
		lng: props.initCity.lng,
	});
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [places, setPlaces] = useState([]);
	const [searchKeyword, setSearchKeyWord] = useState("");
	const [autoInput, setAutoInput] = useState("");
	const [autoList, setAutoList] = useState([]);
	const [markers, setMarkers] = useState([]);
	const infowindow = props.infowindow;
	const days = props.date[1].diff(props.date[0], "day") + 1;
	const [plansData, setPlansData] = useState(createPlans(days));
	const [markerVisible, setMarkerVisible] = useState(createVisible(days));
	const recommendation = props.recommendation;
	const [recomVisible, setRecomVisible] = useState(false);
	const recomMarkers = props.recomMarkers;
	const [openPlanSelect, setOpenPlanSelect] = useState(false);
	const [selectedDate, setSelectedDate] = useState(-1);
	const [efficientPlan, setEffientPlan] = useState([]);
	const [morePalcesPlan, setMorePlacesPlan] = useState([]);

	function save() {
		console.log("this is a save function");
		// saveTripPlan(convert plansData to reqeust body)
	}

	function createPlans(days) {
		let plans = [];
		for (let i = 0; i < days; i++) {
			plans.push([]);
		}
		return plans;
	}

	function createVisible(days) {
		let list = [];
		list.push(true);
		for (let i = 1; i <= days; i++) {
			list.push(false);
		}
		return list;
	}

	const items1 = createDayList();
	function createDayList() {
		const list = [];
		for (let i = 0; i < days; i++) {
			list.push({
				key: i.toString(),
				label: (
					<span>
						<CalendarOutlined />{" "}
						{[props.date[0].add(i, "day").format("MMM Do")]}
					</span>
				),
			});
		}
		return list;
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
				<span>
					Delete <DeleteOutlined />
				</span>
			),
		},
	];
	const items3 = [
		{
			key: "1",
			label: (
				<span>
					Show <EyeOutlined />
				</span>
			),
		},
		{
			key: "2",
			label: (
				<span>
					Hide <EyeInvisibleOutlined />
				</span>
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
				render: (record) => startTimeRender(row, record),
			},
			{
				title: "Duration",
				key: "stay_duration",
				render: (record) => durationRender(row, record),
			},
			{
				title: "Action",
				key: "operation",
				render: (record) => plansDataAct(row, record),
			},
		];

		let inTable = plansData[row.key];
		return (
			<Table columns={columns} dataSource={inTable} pagination={false} />
		);
	};
	function startTimeRender(row, record) {
		return (
			<Space style={{ width: 105 }}>
				<TimePicker
					style={{ width: 105 }}
					format="h:mm A"
					allowClear={false}
					showNow={false}
					value={record.time}
					onChange={(e) => {
						hideAllMarkers(plansData);
						const newPlans = cloneDeep(plansData);
						newPlans[row.key][record.key].time = e;
						setPlansData(newPlans);
					}}
				/>
			</Space>
		);
	}
	function durationRender(row, record) {
		return (
			<Space style={{ width: 80 }}>
				<TimePicker
					style={{ width: 80 }}
					format="H:mm"
					allowClear={false}
					showNow={false}
					value={record.duration}
					onChange={(e) => {
						hideAllMarkers(plansData);
						const newPlans = cloneDeep(plansData);
						newPlans[row.key][record.key].duration = e;
						setPlansData(newPlans);
					}}
				/>
			</Space>
		);
	}
	function plansDataAct(row, record) {
		return (
			<Space style={{ width: 165 }}>
				<Dropdown
					menu={{
						items: items2,
						onClick: (e) => optionsClick(row, record, e),
					}}
				>
					<span>
						Options <DownOutlined />
					</span>
				</Dropdown>
				<Dropdown
					menu={{
						items: items1,
						onClick: (e) => plansDataMove(row, record, e),
					}}
				>
					<span onClick={(e) => e.preventDefault()}>
						Move to <DownOutlined />
					</span>
				</Dropdown>
			</Space>
		);
	}
	function optionsClick(row, record, e) {
		if (e.key === "1") {
			hideAllMarkers(plansData);
			const newPlans = cloneDeep(plansData);
			const moving = newPlans[row.key].splice(record.key, 1);
			newPlans[row.key].unshift(moving[0]);
			for (let i = 0; i < newPlans[row.key].length; i++) {
				newPlans[row.key][i].key = i.toString();
				newPlans[row.key][i].marker.label = `${i + 1}`;
			}
			setPlansData(newPlans);
		}
		if (e.key === "2") {
			openInfoWindow(parseInt(row.key), parseInt(record.key));
		}
		if (e.key === "3") {
			hideAllMarkers(plansData);
			const newPlans = cloneDeep(plansData);
			newPlans[row.key].splice(record.key, 1);
			for (let i = 0; i < newPlans[row.key].length; i++) {
				newPlans[row.key][i].key = i.toString();
				newPlans[row.key][i].marker.label = `${i + 1}`;
			}
			setPlansData(newPlans);
		}
	}
	function plansDataMove(row, record, e) {
		hideAllMarkers(plansData);
		const newPlans = cloneDeep(plansData);
		const moving = newPlans[row.key][record.key];
		newPlans[row.key].splice(record.key, 1);
		newPlans[e.key].push(moving);
		for (let i = 0; i < newPlans[row.key].length; i++) {
			newPlans[row.key][i].key = i.toString();
			newPlans[row.key][i].marker.label = `${i + 1}`;
		}
		for (let i = 0; i < newPlans[e.key].length; i++) {
			newPlans[e.key][i].key = i.toString();
			newPlans[e.key][i].marker.label = `${i + 1}`;
		}
		setPlansData(newPlans);
	}
	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Action",
			key: "operation",
			render: (record) => plansAct(record),
		},
	];
	function plansAct(record) {
		return (
			<Space size="middle">
				<Dropdown
					menu={{
						items: items3,
						onClick: (e) => plansMarkerClick(record, e),
					}}
				>
					<span onClick={(e) => e.preventDefault()}>
						Pins on map <DownOutlined />
					</span>
				</Dropdown>
				<Typography.Link
					onClick={() => showPlanDrawer(parseInt(record.key))}
				>
					Arrange schedule for today <ScheduleOutlined />
				</Typography.Link>
			</Space>
		);
	}
	function plansMarkerClick(record, e) {
		const newList = cloneDeep(markerVisible);
		hideRecommendation();
		hideMarkers();
		if (e.key === "1") {
			newList[parseInt(record.key) + 1] = true;
			showMarkersInPlan(parseInt(record.key));
			createListener(parseInt(record.key));
		} else if (e.key === "2") {
			newList[parseInt(record.key) + 1] = false;
			hideMarkersInPlan(parseInt(record.key));
		}
		setMarkerVisible(newList);
	}
	const data = [];
	for (let i = 0; i < days; ++i) {
		data.push({
			key: i.toString(),
			date: (
				<span>
					<CalendarOutlined />{" "}
					{[props.date[0].add(i, "day").format("dddd, MMM Do")]}
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
				render: (record) => searchAct(record, row),
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
				place_detail: places[i],
			});
		}

		if (recommendation !== null) {
			for (let i = 0; i < recommendation.length; i++) {
				placesData[0].push({
					key: i.toString(),
					place: recommendation[i].name,
					place_detail: recommendation[i],
				});
				recomMarkers[i].addListener("click", () => {
					infowindow.close();
					infowindow.setContent(recomMarkers[i].content);
					infowindow.open(recomMarkers[i].getMap(), recomMarkers[i]);
				});
			}
		}

		let inTable = placesData[row.key];
		return (
			<Table columns={columns} dataSource={inTable} pagination={false} />
		);
		function searchAct(record, row) {
			return (
				<Space style={{ width: 195 }}>
					<Typography.Link
						onClick={() =>
							openSearchInfoWindow(
								parseInt(row.key),
								parseInt(record.key)
							)
						}
					>
						Open on map
					</Typography.Link>
					<span> </span>
					<Dropdown
						menu={{
							items: items1,
							onClick: (e) => moveSearch(record, row, e),
						}}
					>
						<span onClick={(e) => e.preventDefault()}>
							Move to <DownOutlined />
						</span>
					</Dropdown>
				</Space>
			);
		}
		function moveSearch(record, row, e) {
			hideAllMarkers(plansData);
			hideMarkers();
			hideRecommendation();
			const newPlans = cloneDeep(plansData);
			const moving = placesData[row.key][record.key];
			moving.time = props.date[0].hour(8).minute(0);
			moving.duration = props.date[0].hour(3).minute(0);
			moving.marker = cloneDeep(
				parseInt(row.key) === 0
					? recomMarkers[record.key]
					: markers[record.key]
			);
			moving.marker.setMap(null);
			newPlans[e.key].push(moving);
			for (let i = 0; i < newPlans[e.key].length; i++) {
				newPlans[e.key][i].key = i.toString();
				newPlans[e.key][i].marker.label = `${i + 1}`;
				newPlans[e.key][i].marker.setMap(mapInstance);
			}
			if (markerVisible[0] === true) {
				showMarkers();
			}
			if (recomVisible === true) {
				showRecommendation();
			}
			setPlansData(newPlans);
		}
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
			render: (record) => searchMarkerAct(record),
		},
	];
	function searchMarkerAct(record) {
		return (
			<Space size="middle">
				<Dropdown
					menu={{
						items: items3,
						onClick: (e) => searchMarkerClick(record, e),
					}}
				>
					<span onClick={(e) => e.preventDefault()}>
						Pins on map <DownOutlined />
					</span>
				</Dropdown>
			</Space>
		);
	}
	function searchMarkerClick(record, e) {
		hideAllMarkers(plansData);
		if (record.key === "0") {
			if (e.key === "1") {
				showRecommendation();
				setRecomVisible(true);
			} else if (e.key === "2") {
				hideRecommendation();
				setRecomVisible(false);
			}
		}
		if (record.key === "1") {
			const newList = cloneDeep(markerVisible);
			if (e.key === "1") {
				showMarkers();
				newList[0] = true;
			} else if (e.key === "2") {
				hideMarkers();
				newList[0] = false;
			}
			setMarkerVisible(newList);
		}
	}
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

	const defaultProps = {
		center: {
			lat: props.initCity.lat,
			lng: props.initCity.lng,
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
					setPlaces([]);
					deleteMarkers();
					const list = [];
					for (let i = 0; i < results.length; i++) {
						list.push([]);
					}
					for (let i = 0; i < results.length; i++) {
						let set = false;
						if (i === results.length - 1) {
							set = true;
						}
						detailsSearch(results[i].place_id, list, i, set);
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
			map: markerVisible[0] ? map : null,
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

	function showMarkers() {
		for (let i = 0; i < markers.length; i++) {
			markers[i].setMap(mapInstance);
		}
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

	useEffect(() => {
		if (mapApiLoaded) {
			handleMarkerVisible();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [plansData]);
	function handleMarkerVisible() {
		for (let i = 0; i < markerVisible.length; i++) {
			if (markerVisible[i + 1] === true) {
				showMarkersInPlan(i);
				createListener(i);
			} else if (markerVisible[i + 1] === false) {
				hideMarkersInPlan(i);
			}
		}
	}
	function showMarkersInPlan(index) {
		for (let i = 0; i < plansData[index].length; i++) {
			plansData[index][i].marker.setMap(mapInstance);
		}
	}
	function hideMarkersInPlan(index) {
		for (let i = 0; i < plansData[index].length; i++) {
			plansData[index][i].marker.setMap(null);
		}
	}
	function createListener(index) {
		for (let i = 0; i < plansData[index].length; i++) {
			plansData[index][i].marker.addListener("click", () => {
				infowindow.close();
				infowindow.setContent(plansData[index][i].marker.content);
				infowindow.open(mapInstance, plansData[index][i].marker);
			});
		}
	}
	function hideAllMarkers(oldPlans) {
		for (let i = 0; i < oldPlans.length; i++) {
			for (let j = 0; j < oldPlans[i].length; j++) {
				oldPlans[i][j].marker.setMap(null);
			}
		}
	}
	function openInfoWindow(day, spot) {
		showMarkersInPlan(day);
		infowindow.close();
		infowindow.setContent(plansData[day][spot].marker.content);
		infowindow.open(mapInstance, plansData[day][spot].marker);
		const newList = cloneDeep(markerVisible);
		newList[day + 1] = true;
		setMarkerVisible(newList);
	}
	function openSearchInfoWindow(row, spot) {
		if (row === 0) {
			showRecommendation();
			infowindow.close();
			infowindow.setContent(recomMarkers[spot].content);
			infowindow.open(mapInstance, recomMarkers[spot]);
			setRecomVisible(true);
		}
		if (row === 1) {
			showMarkers();
			infowindow.close();
			infowindow.setContent(markers[spot].content);
			infowindow.open(mapInstance, markers[spot]);
			const newList = cloneDeep(markerVisible);
			newList[0] = true;
			setMarkerVisible(newList);
		}
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
					setPlaces([]);
					deleteMarkers();
					const list = [];
					for (let i = 0; i < results.length; i++) {
						list.push([]);
					}
					for (let i = 0; i < results.length; i++) {
						let set = false;
						if (i === results.length - 1) {
							set = true;
						}
						detailsSearch(results[i].place_id, list, i, set);
						createMarker(results[i], i, mapInstance);
					}
					return;
				}
				console.log("error");
				openNotification();
			});
		}
	};

	const detailsSearch = (id, list, i, set) => {
		if (mapApiLoaded) {
			const service = new mapApi.places.PlacesService(mapInstance);

			const request = {
				placeId: id,
				fields: [
					"name",
					"opening_hours",
					"place_id",
					"geometry",
					"photos",
				],
			};

			service.getDetails(request, (place, status) => {
				if (
					status === mapApi.places.PlacesServiceStatus.OK &&
					place &&
					place.geometry &&
					place.geometry.location
				) {
					list[i] = place;
					if (set) {
						setPlaces(list);
					}
					return;
				}
				console.log("error");
			});
		}
	};

	const openNotification = () => {
		notification.open({
			message: "No result found",
			description: "Please try another keyword or enter valid name",
		});
	};

	function showRecommendation() {
		for (let i = 0; i < recomMarkers.length; i++) {
			recomMarkers[i].setMap(mapInstance);
		}
	}
	function hideRecommendation() {
		for (let i = 0; i < recomMarkers.length; i++) {
			recomMarkers[i].setMap(null);
		}
	}

	const showPlanDrawer = (day) => {
		setSelectedDate(day);
		createPlanData(day);
		setOpenPlanSelect(true);
	};
	const onCloseDrawer = () => {
		setOpenPlanSelect(false);
	};

	const createPlanData = (day) => {
		setEffientPlan([]);
		setMorePlacesPlan([]);
		if (plansData[day].length === 0) {
			return;
		}
		const request = {
			init: true,
			desired_plan: {
				date: props.date[0].add(day, "day"),
				start_location: plansData[day][0].place_detail,
				start_time: plansData[day][0].time
					.add(plansData[day][0].duration.get("hour"), "hour")
					.add(plansData[day][0].duration.get("minute"), "minute"),
				visits: [],
			},
		};
		for (let i = 0; i < plansData[day].length - 1; i++) {
			request.desired_plan.visits.push([]);
			request.desired_plan.visits[i] = {
				place: plansData[day][i + 1].place_detail,
				stay_duration: plansData[day][i + 1].duration,
			};
		}
		setEffientPlan(dataPlans);
		// uncomment below and delete above set line when backend api is working
		// const result = buildTripPlan(request);
		// const ePlan = [];
		// ePlan.push({
		// 	key: "0",
		// 	place: plansData[day][0].place,
		// 	start_time: plansData[day][0].time,
		// 	stay_duration: plansData[day][0].duration,
		// })
		// for (let i = 0; i < result.proposed_plans[0].visits.length; i++) {
		// 	ePlan.push({
		// 		key: (i + 1).toString(),
		// 		Place: result.proposed_plans[0].visits[i].place.name,
		// 		start_time: result.proposed_plans[0].visits[i].start_time,
		// 		stay_duration: result.proposed_plans[0].visits[i].stay_duration,
		// 	})
		// }
		// setEffientPlan(ePlan);
		// const pPlan = [];
		// pPlan.push({
		// 	key: "0",
		// 	place: plansData[day][0].place,
		// 	start_time: plansData[day][0].time,
		// 	stay_duration: plansData[day][0].duration,
		// })
		// for (let i = 0; i < result.proposed_plans[1].visits.length; i++) {
		// 	ePlan.push({
		// 		key: (i + 1).toString(),
		// 		Place: result.proposed_plans[1].visits[i].place.name,
		// 		start_time: result.proposed_plans[1].visits[i].start_time,
		// 		stay_duration: result.proposed_plans[1].visits[i].stay_duration,
		// 	})
		// }
		// setMorePlacesPlan(pPlan);
	};
	const saveEfficientPlan = () => {
		hideAllMarkers(plansData);
		const newPlans = cloneDeep(plansData);
		newPlans[selectedDate] = [];
		for (let i = 0; i < efficientPlan.length; i++) {
			if (i === 0) {
				newPlans[selectedDate].push(plansData[selectedDate][0]);
			} else {
				for (let j = 1; j < plansData[selectedDate].length; j++) {
					if (
						efficientPlan[i].place ===
						plansData[selectedDate][j].place
					) {
						newPlans[selectedDate].push(plansData[selectedDate][j]);
						newPlans[selectedDate][i].time =
							efficientPlan[i].start_time;
						newPlans[selectedDate][i].duration =
							efficientPlan[i].stay_duration;
					}
				}
			}
		}
		for (let i = 0; i < newPlans[selectedDate].length; i++) {
			newPlans[selectedDate][i].key = i.toString();
			newPlans[selectedDate][i].marker.label = `${i + 1}`;
		}
		setPlansData(newPlans);
		setOpenPlanSelect(false);
	};
	const saveMorePalcesPlan = () => {
		hideAllMarkers(plansData);
		const newPlans = cloneDeep(plansData);
		newPlans[selectedDate] = [];
		for (let i = 0; i < morePalcesPlan.length; i++) {
			if (i === 0) {
				newPlans[selectedDate].push(plansData[selectedDate][0]);
			} else {
				for (let j = 1; j < plansData[selectedDate].length; j++) {
					if (
						morePalcesPlan[i].place ===
						plansData[selectedDate][j].place
					) {
						newPlans[selectedDate].push(plansData[selectedDate][j]);
						newPlans[selectedDate][i].time =
							morePalcesPlan[i].start_time;
						newPlans[selectedDate][i].duration =
							morePalcesPlan[i].stay_duration;
					}
				}
			}
		}
		for (let i = 0; i < newPlans[selectedDate].length; i++) {
			newPlans[selectedDate][i].key = i.toString();
			newPlans[selectedDate][i].marker.label = `${i + 1}`;
		}
		setPlansData(newPlans);
		setOpenPlanSelect(false);
	};
	const columnsPlans = [
		{
			title: "Place",
			dataIndex: "place",
		},
		{
			title: "Start Time",
			dataIndex: "start_time",
			align: "right",
		},
		{
			title: "Duration",
			dataIndex: "stay_duration",
		},
	];
	const dataPlans = [
		{
			key: "0",
			place: "Place1",
			start_time: "8:00 AM",
			stay_duration: "3:00",
		},
		{
			key: "1",
			place: "Place2",
			start_time: "11:00 AM",
			stay_duration: "3:00",
		},
		{
			key: "2",
			place: "Place3",
			start_time: "2:00 PM",
			stay_duration: "3:00",
		},
	];

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
									setSearchKeyWord(e.target.value)
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
						<Popconfirm
							title="Reset Travel Plan"
							description="Are you sure to reset this plan? All data will be lost."
							onConfirm={handleReset}
							onCancel={() => {}}
							okText="Yes"
							cancelText="No"
						>
							<Button type="primary">Reset Travel Plan</Button>
						</Popconfirm>
						<Button type="primary" onClick={save}>
							Save This Travel Plan!
						</Button>
					</Footer>
				</Layout>
			</Layout>
			<Drawer
				title={
					"Optimizing " +
					props.date[0].add(selectedDate, "day").format("MMM Do") +
					" Plan With Your Set Duration And Start Place"
				}
				width={928}
				onClose={onCloseDrawer}
				open={openPlanSelect}
				bodyStyle={{
					paddingBottom: 80,
				}}
			>
				<Table
					columns={columnsPlans}
					dataSource={efficientPlan}
					pagination={false}
					title={() => "Most Efficient Plan"}
					footer={() => (
						<Button type="primary" onClick={saveEfficientPlan}>
							Save This Travel Plan!
						</Button>
					)}
				/>
				<Table
					columns={columnsPlans}
					dataSource={morePalcesPlan}
					pagination={false}
					title={() => "Most Places Visiting Plan"}
					footer={() => (
						<Button type="primary" onClick={saveMorePalcesPlan}>
							Save This Travel Plan!
						</Button>
					)}
				/>
			</Drawer>
		</div>
	);
};

export default CreatePlanContent;
