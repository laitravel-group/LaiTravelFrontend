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
				plans.push(TripPlanDetailsPerDay.init(startDate.add(i, "day")));
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
		const startDate = dayjs(jsonObject.start_date, "YYYY-MM-DD");
		const endDate = dayjs(jsonObject.end_date, "YYYY-MM-DD");
		const numDays = endDate.diff(startDate, "day") + 1;
		const tripPlanDetailsMap = {};
		for (const tripPlanDetailsPerDay of jsonObject.details) {
			tripPlanDetailsMap[tripPlanDetailsPerDay.date] =
				tripPlanDetailsPerDay;
		}
		const tripPlanDetails = new Array(numDays).fill(null).map((_, i) => {
			const currentDay = startDate.add(i, "day");
			const existingTripPlanDetailsPerDay =
				tripPlanDetailsMap[currentDay.format("YYYY-MM-DD")];
			if (existingTripPlanDetailsPerDay)
				return TripPlanDetailsPerDay.fromJson(
					existingTripPlanDetailsPerDay
				);
			else return TripPlanDetailsPerDay.init(currentDay);
		});

		return new TripPlan(
			jsonObject.trip_id,
			jsonObject.city_id,
			jsonObject.destination_city,
			startDate,
			endDate,
			tripPlanDetails
		);
	}

	toJson() {
		const tripPlanDetailsJson = [];
		for (const tripPlanDetailsPerDay of this.details) {
			if (tripPlanDetailsPerDay.visits.length > 0)
				tripPlanDetailsJson.push(tripPlanDetailsPerDay.toJson());
		}

		return {
			trip_id: this.tripId,
			city_id: this.cityId,
			destination_city: this.destinationCity,
			start_date: this.startDate.format("YYYY-MM-DD"),
			end_date: this.endDate.format("YYYY-MM-DD"),
			details: tripPlanDetailsJson,
		};
	}
}
