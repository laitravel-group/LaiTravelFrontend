const domain = "http://localhost:8080";
const google_api_key = "AIzaSyC2CxkBl9JyAPvO0lAKDrvBHw4oURSCXFI";

// auth
export const signup = (credentials) => {
	console.log(credentials);
	const url = `${domain}/signup`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((res) => handleResponseStatus(res, "Failed to register"));
};

export const login = (credentials) => {
	const url = `${domain}/login`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	})
		.then((res) => handleResponseStatus(res, "Failed to log in"))
		.then((json) => localStorage.setItem("authToken", json.token));
};

export const logout = (authToken) => {
	const url = `${domain}/logout`;
	return fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) => handleResponseStatus(res, "Failed to log out"));
};

// user
export const getUser = () => {
	const url = `${domain}/user`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) =>
		handleResponseStatus(res, "Failed to load your information")
	);
};

export const userEdit = (credentials) => {
	const url = `${domain}/user-edit`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(credentials),
	}).then((res) =>
		handleResponseStatus(res, "Failed to update your information")
	);
};

// place
export const getPlaces = (city, startDate, endDate) => {
	const url = `${domain}/places?city=${city}&start_date=${startDate}&end_date=${endDate}`;
	return fetch(url).then((res) =>
		handleResponseStatus(res, `Failed to get places`)
	);
};

export const getPlaceDetails = (placeId) => {
	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${google_api_key}`;
	return fetch(url).then((res) =>
		handleResponseStatus(res, `Failed to get place details`)
	);
};

// trip plans
export const getTripPlanList = () => {
	const url = `${domain}/trip-plans`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) => handleResponseStatus(res, `Failed to get trip plan list`));
};

export const getTripPlanDetails = (tripId) => {
	const url = `${domain}/trip-plan-details?trip_id=${tripId}`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) =>
		handleResponseStatus(res, `Failed to get trip plan details`)
	);
};

export const deleteTripPlan = async (tripId) => {
	const url = `${domain}/trip-plans`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) =>
		handleResponseStatus(res, `Failed to delete the trip plan`)
	);
};

export const buildTripPlan = (desiredPlan) => {
	const url = `${domain}/trip-plan-build`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(desiredPlan),
	}).then((res) =>
		handleResponseStatus(res, `Failed to generate a trip plan`)
	);
};

export const buildUpdateTripPlan = (updatedPlan) => {
	const url = `${domain}/trip-plan-build-update`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedPlan),
	}).then((res) =>
		handleResponseStatus(res, `Failed to update the trip plan`)
	);
};

export const saveTripPlan = (data) => {
	const url = `${domain}/trip-plans-save`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(data),
	}).then((res) => handleResponseStatus(res, `Failed to save the trip plan`));
};

// helper
const handleResponseStatus = (res, errMsg) => {
	const { status, ok } = res;

	// unauthorised
	if (status === 401) {
		localStorage.removeItem("authToken");
		window.location.reload();
	}

	// Check if the response is JSON
	const contentType = res?.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		if (!ok) {
			return res.json().then((json) => {
				throw Error(`${errMsg}: ${JSON.stringify(json)}`);
			});
		} else {
			return res.json();
		}
	} else {
		// Otherwise, treat the response as plain text
		if (!ok) {
			return res.text().then((text) => {
				if (text) throw Error(`${errMsg}: ${text}`);
				else throw Error(`${errMsg}: something went wrong.`);
			});
		} else {
			return res.text();
		}
	}
};
