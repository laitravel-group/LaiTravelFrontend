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
					createRecommendation(results[0]);
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

	const createRecommendation = (place) => {
		if (mapApiLoaded) {
			const service = new mapApi.places.PlacesService(mapInstance);

			const request = {
				location: {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				},
				radius: 30000,
				keyword: "famous travel spot",
				rankBy: mapApi.places.RankBy.PROMINENCE,
			};

			service.nearbySearch(request, (results, status) => {
				if (
					status === mapApi.places.PlacesServiceStatus.OK &&
					results
				) {
					props.setRecommendation([]);
					deleteRecomMarkers();
					for (let i = 0; i < results.length; i++) {
						detailsSearch(results[i].place_id);
						createRecomMarker(results[i], i);
					}
					const infowindow = new mapApi.InfoWindow();
					props.setInfowindow(infowindow);
					props.setStartCity({
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
					});
					return;
				}
				console.log("No Recommendation");
			});
		}
	};
	const detailsSearch = (id) => {
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
					props.setRecommendation((recommendation) => [
						...recommendation,
						place,
					]);
					return;
				}
				console.log("error");
			});
		}
	};
	function deleteRecomMarkers() {
		for (let i = 0; i < props.recomMarkers.length; i++) {
			props.recomMarkers[i].setMap(null);
		}
		props.setRecomMarkers([]);
	}
	function createRecomMarker(place, i) {
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
			map: null,
			title: place.name,
			label: `${i + 1}`,
			optimized: false,
			content: contentString,
		});

		props.setRecomMarkers((markers) => [...markers, marker]);
	}

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
