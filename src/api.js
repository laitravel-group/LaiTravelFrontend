const domain = "";
const google_api_key = "AIzaSyC2CxkBl9JyAPvO0lAKDrvBHw4oURSCXFI";

// auth
export const signup = async (credentials) => {
	const url = `${domain}/signup`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	handleResponseStatus(res, `Failed to register: ${res.text}`);
};

export const login = async (credentials) => {
	const url = `${domain}/login`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	handleResponseStatus(
		res,
		"Failed to log in: incorrect username or password"
	);
	const token = await res.text();
	localStorage.setItem("authToken", token);
};

export const logout = async () => {
	const url = `${domain}/logout`;
	const res = await fetch(url, {
		method: "POST",
		credentials: "include",
	});
	handleResponseStatus(res, "Failed to log out");
};

// user
export const getUser = async () => {
	const url = `${domain}/user`;
	const authToken = localStorage.getItem("authToken");
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	handleResponseStatus(
		res,
		"Something went wrong when getting your information"
	);
	return await res.json();
};

export const userEdit = async (credentials) => {
	const url = `${domain}/user-edit`;
	const authToken = localStorage.getItem("authToken");
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(credentials),
	});
	handleResponseStatus(res, "Failed to update your information");
};

// place
export const getPlaces = async (city, startDate, endDate) => {
	const url = `${domain}/places?city=${city}&startDate=${startDate}&endDate=${endDate}`;
	const res = await fetch(url);
	handleResponseStatus(res, `Failed to get places: ${res.text()}`);
	return await res.json();
};

export const getPlaceDetails = async (placeId) => {
	const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${google_api_key}`;
	const res = await fetch(url);
	handleResponseStatus(res, `Failed to get place details: ${res.text}`);
	return await res.json();
};

// trip plans
export const getTripPlanList = async () => {
	const url = `${domain}/trip-plans`;
	const authToken = localStorage.getItem("authToken");
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	handleResponseStatus(res, `Failed to get trip plan list: ${res.text}`);
	return await res.json();
};

export const getTripPlanDetails = async (tripId) => {
	const url = `${domain}/trip-plan-details?tripId=${tripId}`;
	const authToken = localStorage.getItem("authToken");
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	handleResponseStatus(res, `Failed to get trip plan details: ${res.text}`);
	return await res.json();
};

export const deleteTripPlan = async (tripId) => {
	const url = `${domain}/trip-plans`;
	const authToken = localStorage.getItem("authToken");
	const res = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	handleResponseStatus(res, `Failed to delete the trip plan: ${res.text}`);
	return await res.json();
};

export const buildTripPlan = async (desiredPlan) => {
	const url = `${domain}/trip-plan-build`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(desiredPlan),
	});
	handleResponseStatus(res, `Failed to generate a trip plan: ${res.text}`);
	return await res.json();
};

export const buildUpdateTripPlan = async (updatedPlan) => {
	const url = `${domain}/trip-plan-build-update`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedPlan),
	});
	handleResponseStatus(res, `Failed to update the trip plan: ${res.text}`);
	return await res.json();
};

export const saveTripPlan = async (data) => {
	const url = `${domain}/trip-plans-save`;
	const authToken = localStorage.getItem("authToken");
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(data),
	});
	handleResponseStatus(res, `Failed to save the trip plan: ${res.text}`);
	return await res.json();
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
