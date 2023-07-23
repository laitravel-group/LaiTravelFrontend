import React, { useEffect, useState } from "react";
import { AutoComplete, message } from "antd";

export default function SearchBox({
	googleMap,
	placesService,
	setSearchResult,
	searchCallback,
}) {
	const [messageApi, contextHolder] = message.useMessage();

	const [input, setInput] = useState("");
	const [options, setOptions] = useState([]);

	const { mapApi } = googleMap;

	const autocompleteService = new mapApi.places.AutocompleteService();

	const handleAutocomplete = () => {
		const request = {
			input: input,
		};

		autocompleteService.getPlacePredictions(request, (results) => {
			if (!results) {
				setOptions([]);
				return;
			}
			const descriptions = results.map((result) => {
				return {
					value: result.description,
				};
			});
			setOptions(descriptions);

			console.log(options);
		});
	};

	const searchPlace = () => {
		const request = {
			query: input,
			fields: [
				"geometry",
				"icon",
				"icon_background_color",
				"icon_mask_base_uri",
				"name",
				"opening_hours",
				"photos",
				"place_id",
				"rating",
				"reference",
				"types",
				"user_ratings_total",
			],
		};

		placesService.findPlaceFromQuery(request, (results, status) => {
			if (status !== mapApi.places.PlacesServiceStatus.OK) {
				message.error(
					"Failed to search places, it seems that Google Place Service is down, please try again later."
				);
			} else if (results) {
				for (const result of results) {
					console.log(result);
					const details = detailsSearch(result.place_id);
					if (details !== undefined) {
						result.opening_hours = details.opening_hours;
						result.photos = details.photos;
					}
				}
				return results;
			}
		});
	};

	const detailsSearch = (placeId) => {
		const request = {
			placeId: placeId,
			fields: ["opening_hours", "photos"],
		};

		placesService.getDetails(request, (result, status) => {
			if (status !== mapApi.places.PlacesServiceStatus.OK) {
				message.error(
					"Failed to get place details, it seems that Google Place Service is down, please try again later."
				);
			} else {
				return result;
			}
		});
	};

	useEffect(() => {
		handleAutocomplete();
	}, [input]);

	const onChange = (data) => {
		setInput(data);
	};

	return (
		<AutoComplete
			value={input}
			options={options}
			style={{ width: 428 }}
			onChange={onChange}
			onSearch={searchPlace}
			placeholder="Search place name"
		/>
	);
}
