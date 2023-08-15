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

	static init(place) {
		return new PlaceVisitDetails(
			place,
			undefined,
			undefined,
			undefined,
			undefined
		);
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
		const startTimeStr = this.startTime?.format("HH:mm");
		const endTimeStr = this.endTime?.format("HH:mm");
		return {
			place: this.place.toJson(),
			travel_time: this.travelTime,
			start_time:
				startTimeStr === "Invalid Date" ? undefined : startTimeStr,
			end_time: endTimeStr === "Invalid Date" ? undefined : endTimeStr,
			stay_duration: this.stayDuration,
		};
	}
}
