import React, { useState } from "react";
import { Button, DatePicker, Input, Layout, message } from "antd";
import { apiKey } from "../key";
import GoogleMap from "google-maps-react-markers";
import { Content } from "antd/es/layout/layout";

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

	const apiHasLoaded = (map, mapApi) => {
		setMapInstance(map);
		setMapApi(mapApi);
		setMapApiLoaded(true);
	};

	const findCity = () => {
		if (props.date == null) {
			message.error("Please select your start and end dates");
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
					props.setCityLocation({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					});
				} else {
					message.error("Please enter a valid city name");
				}
			});
		} else {
			message.error(
				"Error! Failed to load Google Map API, please try again later"
			);
		}
	};

	return (
		<Layout style={{ textAlign: "center" }}>
			<Content
				style={{ fontSize: "40px", fontWeight: "bolder" }}
				className="new-plan-search-content"
			>
				Select your destination and dates
			</Content>
			<Content className="new-plan-search-content">
				<div style={{ display: "flex", justifyContent: "center" }}>
					<table>
						<tr style={{ textAlign: "left" }}>
							<td>Dates</td>
							<td>Destination</td>
						</tr>
						<tr>
							<td>
								<RangePicker
									value={props.date}
									onChange={(e) => props.setDate(e)}
								/>
							</td>
							<td>
								<Input
									style={{ width: "15vw" }}
									placeholder="Search city"
									value={start}
									onChange={(e) => setStart(e.target.value)}
									onPressEnter={() => findCity()}
								/>
							</td>
							<td>
								<Button type="primary" onClick={findCity}>
									Search
								</Button>
							</td>
						</tr>
					</table>
				</div>
				<div style={{ display: "none" }}>
					<GoogleMap
						apiKey={apiKey}
						defaultCenter={defaultProps.center}
						defaultZoom={defaultProps.zoom}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({ map, mapApi }) =>
							apiHasLoaded(map, mapApi)
						}
					></GoogleMap>
				</div>
			</Content>
		</Layout>
	);
};

export default InitCity;
