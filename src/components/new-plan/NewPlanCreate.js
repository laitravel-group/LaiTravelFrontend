import React, { useState } from "react";
import { App as AntdApp, Button, DatePicker, Input, Layout } from "antd";
import GoogleMap from "google-maps-react-markers";
import dayjs from "dayjs";
import PageHeader from "../PageHeader";
import { getFormatString } from "../../utils";
import {google_api_key} from "../../api";

import { Place } from "../../models/place";

const { Content } = Layout;
const { RangePicker } = DatePicker;

const apiKey = google_api_key;

export default function NewPlanCreate(props) {
	const { dates, city, destinationCity } = props;
	const {
		setDates,
		setCity,
		setCityLocation,
		setDestinationCity,
		setRecommendedPlaces,
	} = props;

	// google map api
	const [mapInstance, setMapInstance] = useState(null);
	const [mapApi, setMapApi] = useState(null);
	const [mapApiLoaded, setMapApiLoaded] = useState(false);

	// states
	const [searchInput, setSearchInput] = useState("");

	const { message } = AntdApp.useApp();

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current && current < dayjs().endOf("day");
	};

	const findCity = () => {
		if (dates === null) {
			message.error("Please select your start and end dates");
			return;
		}
		if (dates[1].diff(dates[0], "day") + 1 > 180) {
			message.error(
				"Laitravel only supports trip planning for less than or equal to 180 days!"
			);
			return;
		}

		if (mapApiLoaded) {
			const placesService = new mapApi.places.PlacesService(mapInstance);

			const request = {
				query: searchInput,
				fields: ["place_id", "name", "geometry"],
				language: "en",
			};

			placesService.findPlaceFromQuery(request, (results, status) => {
				if (
					status === mapApi.places.PlacesServiceStatus.OK &&
					results
				) {
					setCity(
						Place.simpleCity(
							results[0].place_id,
							results[0].name,
							results[0].geometry.location.lat(),
							results[0].geometry.location.lng()
						)
					);
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
		<Layout style={{ height: "95vh" }}>
			<PageHeader />
			<div style={{ textAlign: "center" }}>
				<Content
					style={{ fontSize: "40px", fontWeight: "bolder" }}
					className="new-plan-search-content"
				>
					Select your destination and dates
				</Content>
				<Content className="new-plan-search-content">
					<div
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
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
												setDates(dates);
											}}
											placement="bottomLeft"
										/>
									</td>
									<td>
										<Input
											style={{ width: "15vw" }}
											placeholder="Search city"
											value={destinationCity}
											onChange={(e) =>
												setSearchInput(e.target.value)
											}
											onPressEnter={findCity}
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
							defaultCenter={{ lat: 0, lng: 0 }}
							defaultZoom={99}
							yesIWantToUseGoogleMapApiInternals
							onGoogleApiLoaded={({ map, maps }) => {
								setMapInstance(map);
								setMapApi(maps);
								setMapApiLoaded(true);
							}}
						></GoogleMap>
					</div>
				</Content>
			</div>
		</Layout>
	);
}
