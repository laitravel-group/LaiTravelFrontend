import dayjs from "dayjs";
import { Place } from "./place";

export class PlaceVisitDetails {
	constructor(place, travelTime, startTime, endTime, stayDuration) {
		this.place = place;
		this.travelTime = travelTime;
		this.startTime = startTime;
		this.endTime = endTime;
		this.stayDuration = stayDuration;
	}

	// backend api conversion
	static fromJson(jsonObject) {
		return new PlaceVisitDetails(
			Place.fromJson(jsonObject.place),
			jsonObject.travel_time,
			dayjs(jsonObject.start_time, "HH:mm"),
			dayjs(jsonObject.end_time, "HH:mm"),
			jsonObject.stay_duration
		);
	}

	toJson() {
		return {
			place: this.place.toJson(),
			travel_time: this.travelTime,
			start_time: this.startTime.format("HH:mm"),
			end_time: this.endTime.format("HH:mm"),
			stay_duration: this.stayDuration,
		};
	}
}
