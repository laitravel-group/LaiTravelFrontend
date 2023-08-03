import dayjs from "dayjs";

export class OpeningHours {
	constructor(dayOfWeek, openTime, closeTime) {
		this.dayOfWeek = dayOfWeek;
		this.openTime = openTime;
		this.closeTime = closeTime;
	}

	// subject to change due to google api inconsistency
	static fromGooglePlaceServiceApiOpeningHours(googleOpeningHours) {
		let weekdayText = googleOpeningHours.weekday_text;
		return googleOpeningHours.periods.map((period) => {
			let dayOfWeek = weekdayText[period.open.day];
			let openTime = dayjs()
				.hour(period.open.hours)
				.minute(period.open.minutes);
			let closeTime =
				period.close !== undefined
					? dayjs()
							.hour(period.close.hours)
							.minute(period.close.minutes)
					: dayjs().hour(18);
			return new OpeningHours(dayOfWeek, openTime, closeTime);
		});
	}

	// beta
	static fromGooglePlaceApiOpeningHours(googleOpeningHours) {
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

	// backend api conversion
	static fromJson(jsonObject) {
		return new OpeningHours(
			jsonObject.day_of_week,
			dayjs(jsonObject.open_time, "HH:mm"),
			dayjs(jsonObject.close_time, "HH:mm")
		);
	}

	toJson() {
		const openTimeStr = this.openTime.format("HH:mm");
		const closeTimeStr = this.closeTime.format("HH:mm");
		return {
			day_of_week: this.dayOfWeek,
			open_time: openTimeStr === "Invalid Date" ? undefined : openTimeStr,
			close_time:
				closeTimeStr === "Invalid Date" ? undefined : closeTimeStr,
		};
	}
}
