import dayjs from "dayjs";
import { TripPlanDetailsPerDay } from "./tripPlanDetailsPerDay";

export class TripPlan {
	constructor(tripId, cityId, destinationCity, startDate, endDate, details) {
		this.tripId = tripId;
		this.cityId = cityId;
		this.destinationCity = destinationCity;
		this.startDate = startDate;
		this.endDate = endDate;
		this.details = details;
	}

	// backend api conversion
	static fromJson(jsonObject) {
		return new TripPlan(
			jsonObject.trip_id,
			jsonObject.city_id,
			jsonObject.destination_city,
			dayjs(jsonObject.start_date, "YYYY-MM-DD"),
			dayjs(jsonObject.end_date, "YYYY-MM-DD"),
			jsonObject.details?.map((details) =>
				TripPlanDetailsPerDay.fromJson(details)
			)
		);
	}

	toJson() {
		return {
			trip_id: this.tripId,
			city_id: this.cityId,
			destination_city: this.destinationCity,
			start_date: this.startDate.format("YYYY-MM-DD"),
			end_date: this.endDate.format("YYYY-MM-DD"),
			details: this.details?.map((details) => details.toJson()),
		};
	}
}
