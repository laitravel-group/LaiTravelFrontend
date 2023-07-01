import React, { useState } from "react";
import { Button, DatePicker, Input, notification, Space } from "antd";
import { apiKey } from "../key";
import GoogleMap from "google-maps-react-markers";

const { RangePicker } = DatePicker;

const InitCity = (props) => {
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [start, setStart] = useState("");

	const defaultProps = {
		center: {
			lat: 37.422131,
			lng: -122.084801,
		},
		zoom: 99,
	};

	const apiHasLoaded = (map, maps) => {
		setMapInstance(map);
		setMapApi(maps);
		setMapApiLoaded(true);
	};

	const findCity = () => {
		if (props.date == null) {
			console.log("no date input");
			openNotification();
			return;
		}
		if (mapApiLoaded) {
			const service = new mapApi.places.PlacesService(mapInstance);

			const request = {
				query: start,
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
					props.setStartCity({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					});
					console.log(results);
					return;
				}
				console.log("search error");
				openNotification();
			});
		}
	};
	const openNotification = () => {
		notification.open({
			message: "Error!",
			description: "Please enter a valid City name and/or Date range!",
		});
	};

	return (
		// Important! Always set the container height explicitly
		<div>
			<div
				style={{
					position: "fixed",
					top: "50%",
					left: "35%",
					height: "100%",
					width: "100%",
				}}
			>
				<Space direction="vertical" size={12}>
					<RangePicker
						value={props.date}
						onChange={(e) => props.setDate(e)}
					/>
				</Space>
				<Input
					style={{ width: "15vw" }}
					placeholder="Search city"
					value={start}
					onChange={(e) => setStart(e.target.value)}
					onPressEnter={() => findCity()}
				/>
				<Button type="primary" onClick={findCity}>
					Search
				</Button>
				<ul>
					<GoogleMap
						apiKey={apiKey}
						defaultCenter={defaultProps.center}
						defaultZoom={defaultProps.zoom}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({ map, maps }) =>
							apiHasLoaded(map, maps)
						}
					></GoogleMap>
				</ul>
			</div>
		</div>
	);
};

export default InitCity;
