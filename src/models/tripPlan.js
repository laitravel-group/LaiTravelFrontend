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

	// init
	static init(cityId, destinationCity, startDate, endDate) {
		const numDays = endDate.diff(startDate, "day") + 1;
		const buildPlanForDays = (numDays) => {
			let plans = [];
			for (let i = 0; i < numDays; i++) {
				plans = [
					...plans,
					TripPlanDetailsPerDay.init(startDate.add(i, "day")),
				];
			}
			return plans;
		};

		return new TripPlan(
			undefined,
			cityId,
			destinationCity,
			startDate,
			endDate,
			buildPlanForDays(numDays)
		);
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
