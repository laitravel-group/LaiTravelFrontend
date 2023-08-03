import dayjs from "dayjs";
import { Place } from "./place";
import { PlaceVisitDetails } from "./placeVisitDetails";

export class TripPlanDetailsPerDay {
	constructor(date, startLocation, startTime, endTime, visits) {
		this.date = date;
		this.startLocation = startLocation;
		this.startTime = startTime;
		this.endTime = endTime;
		this.visits = visits;
	}

	static init(date) {
		return new TripPlanDetailsPerDay(
			date,
			undefined,
			undefined,
			undefined,
			[]
		);
	}

	// backend api conversion
	static fromJson(jsonObject) {
		return new TripPlanDetailsPerDay(
			dayjs(jsonObject.date, "YYYY-MM-DD"),
			Place.fromJson(jsonObject.start_location),
			dayjs(jsonObject.start_time, "HH:mm"),
			dayjs(jsonObject.end_time, "HH:mm"),
			jsonObject.visits?.map((visit) => PlaceVisitDetails.fromJson(visit))
		);
	}

	toJson() {
		const startTimeStr = this.startTime.format("HH:mm");
		const endTimeStr = this.endTime.format("HH:mm");
		return {
			date: this.date.format("YYYY-MM-DD"),
			start_location: this.startLocation.toJson(),
			start_time:
				startTimeStr === "Invalid Date" ? undefined : startTimeStr,
			end_time: endTimeStr === "Invalid Date" ? undefined : endTimeStr,
			visits: this.visits?.map((visit) => visit.toJson()),
		};
	}
}
