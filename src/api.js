const domain = "http://localhost:8080";
const google_api_key = "AIzaSyC2CxkBl9JyAPvO0lAKDrvBHw4oURSCXFI";

// auth
export const signup = (credentials) => {
	const url = `${domain}/signup`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((res) =>
		handleResponseStatus(res, `Failed to register: ${res.text}`)
	);
};

export const login = (credentials) => {
	const url = `${domain}/login`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((res) => {
		handleResponseStatus(
			res,
			"Failed to log in: incorrect username or password"
		);
		const token = res.text();
		localStorage.setItem("authToken", token);
	});
};

export const logout = () => {
	const url = `${domain}/logout`;
	return fetch(url, {
		method: "POST",
		credentials: "include",
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
	}).then((res) => {
		handleResponseStatus(
			res,
			"Something went wrong when getting your information"
		);
		return res.json();
	});
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
	return fetch(url).then((res) => {
		handleResponseStatus(res, `Failed to get places`);
		return res.json();
	});
};

export const getPlaceDetails = (placeId) => {
	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${google_api_key}`;
	return fetch(url).then((res) => {
		handleResponseStatus(res, `Failed to get place details`);
		return res.json();
	});
};

// trip plans
export const getTripPlanList = () => {
	const url = `${domain}/trip-plans`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) => {
		handleResponseStatus(res, `Failed to get trip plan list: ${res.text}`);
		return res.json();
	});
};

export const getTripPlanDetails = (tripId) => {
	const url = `${domain}/trip-plan-details?trip_id=${tripId}`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) => {
		handleResponseStatus(
			res,
			`Failed to get trip plan details: ${res.text}`
		);
		return res.json();
	});
};

export const deleteTripPlan = async (tripId) => {
	const url = `${domain}/trip-plans`;
	const authToken = localStorage.getItem("authToken");
	return fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	}).then((res) => {
		handleResponseStatus(
			res,
			`Failed to delete the trip plan: ${res.text}`
		);
		return res.json();
	});
};

export const buildTripPlan = (desiredPlan) => {
	const url = `${domain}/trip-plan-build`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(desiredPlan),
	}).then((res) => {
		handleResponseStatus(
			res,
			`Failed to generate a trip plan: ${res.text}`
		);
		return res.json();
	});
};

export const buildUpdateTripPlan = (updatedPlan) => {
	const url = `${domain}/trip-plan-build-update`;
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedPlan),
	}).then((res) => {
		handleResponseStatus(
			res,
			`Failed to update the trip plan: ${res.text}`
		);
		return res.json();
	});
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
	}).then((res) => {
		handleResponseStatus(res, `Failed to save the trip plan: ${res.text}`);
		return res.json();
	});
};

// helper
const handleResponseStatus = (res, errMsg) => {
	const { status, ok } = res;

	// unauthorised
	if (status === 401) {
		localStorage.removeItem("authToken");
		window.location.reload();
		return;
	}

	if (!ok) {
		throw Error(errMsg);
	}
};
