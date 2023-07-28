export const tripPlanJson = {
	trip_id: 2,
	city_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
	destination_city: "Sydney",
	start_date: "2023-08-01",
	end_date: "2023-08-02",
	details: [
		{
			date: "2023-08-01",
			start_location: {
				place_name: "start",
				lat: -33.88275286637396,
				lng: 151.20672917659843,
			},
			start_time: "09:00",
			visits: [
				{
					place: {
						place_name: "Hyde Park",
						description: "A park",
						lat: -33.87344060253566,
						lng: 151.21131704281586,
					},
					stay_duration: 30,
					is_visited: false,
				},
				{
					place: {
						place_name: "Opera House",
						description: "World famous opera house",
						lat: -33.85669344935661,
						lng: 151.21510537950104,
					},
					stay_duration: 120,
					is_visited: false,
				},
				{
					place: {
						place_name: "Bondi Beach",
						description: "Most visited beach in Sydney.",
						lat: -33.89119321916367,
						lng: 151.2773225059465,
					},
					stay_duration: 120,
					is_visited: false,
				},
			],
		},
		{
			date: "2023-08-02",
			start_location: {
				place_name: "start",
				lat: -33.88275286637396,
				lng: 151.20672917659843,
			},
			start_time: "09:00",
			visits: [
				{
					place: {
						place_name: "Hyde Park",
						description: "A park",
						lat: -33.87344060253566,
						lng: 151.21131704281586,
					},
					stay_duration: 30,
					is_visited: false,
				},
				{
					place: {
						place_name: "Opera House",
						lat: -33.85669344935661,
						lng: 151.21510537950104,
					},
					stay_duration: 120,
					is_visited: false,
				},
				{
					place: {
						place_name: "Bondi Beach",
						lat: -33.89119321916367,
						lng: 151.2773225059465,
					},
					stay_duration: 150,
					is_visited: false,
				},
			],
		},
	],
};
