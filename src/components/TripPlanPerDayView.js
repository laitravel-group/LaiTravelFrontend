import React from "react";
import { Timeline } from "antd";

export default function TripPlanPerDayView({ tripPlanDetailsPerDay }) {
	const timelineItems = tripPlanDetailsPerDay.visits.map((visit) => {
		return {
			children: (
				<>
					<h4>
						{visit.startTime && visit.startTime.isValid()
							? `${visit.startTime.format(
									"HH:mm"
							  )} - ${visit.endTime.format("HH:mm")} `
							: "Not set yet"}
					</h4>
					<p>{visit.place.placeName}</p>
					<p>{visit.place.description}</p>
				</>
			),
		};
	});
	return (
		<div>
			<h3>Date: {tripPlanDetailsPerDay.date.format("YYYY-MM-DD")}</h3>
			<p>
				Start Location:{" "}
				{tripPlanDetailsPerDay.startLocation?.placeName ??
					"Custom Location"}
			</p>
			<p>
				Start Time:{" "}
				{tripPlanDetailsPerDay.startTime?.format("HH:mm") ?? "Unset"}
			</p>
			<h4>Visits:</h4>
			<Timeline mode="alternate" items={timelineItems} />
		</div>
	);
}
