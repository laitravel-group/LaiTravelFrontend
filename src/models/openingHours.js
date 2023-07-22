import dayjs from "dayjs";

export class OpeningHours {
	constructor(dayOfWeek, openTime, closeTime) {
		this.dayOfWeek = dayOfWeek;
		this.openTime = openTime;
		this.closeTime = closeTime;
	}

	static fromJsonObject(json) {
		return new OpeningHours(
			json.day_of_week,
			dayjs(json.open_time, "HH:mm"),
			dayjs(json.close_time, "HH:mm")
		);
	}

	static fromGoogleApiOpeningHours(googleOpeningHours) {
		let weekdayDescriptions = googleOpeningHours.weekdayDescriptions;
		return googleOpeningHours.periods.map((period) => {
			let dayOfWeek = weekdayDescriptions[period.open.day];
			let openTime = dayjs()
				.hour(period.open.hour)
				.minute(period.open.minute);
			let closeTime =
				period.close !== undefined
					? dayjs()
							.hour(period.close.hour)
							.minute(period.close.minute)
					: dayjs().hour(18);
			return new OpeningHours(dayOfWeek, openTime, closeTime);
		});
	}

	toJsonObject() {
		return {
			day_of_week: this.dayOfWeek,
			open_time: this.openTime.format("HH:mm"),
			close_time: this.closeTime.format("HH:mm"),
		};
	}
}
