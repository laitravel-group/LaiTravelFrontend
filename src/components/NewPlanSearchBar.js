import React, { useState } from "react";
import { Button, DatePicker, Input, Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import GoogleMap from "google-maps-react-markers";
import dayjs from "dayjs";
import { getFormatString } from "../utils";
import { apiKey } from "../key";

const { RangePicker } = DatePicker;

const InitCity = (props) => {
	const { dates, setDates, setCityLocation } = props;

	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [mapApiLoaded, setMapApiLoaded] = useState(false);
	const [start, setStart] = useState("");

	const [messageApi, contextHolder] = message.useMessage();

	const defaultProps = {
		center: {
			lat: 37.422131,
			lng: -122.084801,
		},
		zoom: 99,
	};

	const apiHasLoaded = (mapInstance, mapApi) => {
		setMapInstance(mapInstance);
		setMapApi(mapApi);
		setMapApiLoaded(true);
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current && current < dayjs().endOf("day");
	};

	const findCity = () => {
		if (dates === null) {
			messageApi.error("Please select your start and end dates");
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
					setCityLocation({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					});
				} else {
					messageApi.error("Please enter a valid city name");
				}
			});
		} else {
			messageApi.error(
				"Error! Failed to load Google Map API, please try again later"
			);
		}
	};

	return (
		<>
			{contextHolder}
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
							<thead>
								<tr style={{ textAlign: "left" }}>
									<td>Dates</td>
									<td>Destination</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<RangePicker
											format={getFormatString()}
											disabledDate={disabledDate}
											value={dates}
											onChange={(dates) => {
												console.log(dates);
												setDates(dates);
											}}
											placement="bottomLeft"
										/>
									</td>
									<td>
										<Input
											style={{ width: "15vw" }}
											placeholder="Search city"
											value={start}
											onChange={(e) =>
												setStart(e.target.value)
											}
											onPressEnter={() => findCity()}
										/>
									</td>
									<td>
										<Button
											type="primary"
											onClick={findCity}
										>
											Search
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div style={{ display: "none" }}>
						{/* DO NOT CHANGE THE FUNCTION PARAMS IN THE STATE OF "onGoogleApiLoaded", IT HAS TO BE CALLED "map" AND "maps"! */}
						<GoogleMap
							apiKey={apiKey}
							defaultCenter={defaultProps.center}
							defaultZoom={defaultProps.zoom}
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={({ map, maps }) =>
								apiHasLoaded(map, maps)
							}
						></GoogleMap>
					</div>
				</Content>
			</Layout>
		</>
	);
};

export default InitCity;
