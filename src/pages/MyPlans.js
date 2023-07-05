import React, { useEffect, useState } from "react";
import { Layout, Tabs, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const { TabPane } = Tabs;

export default function MyPlans(props) {
	const navigate = useNavigate();
	const [tripPlanDetails, setTripPlanDetails] = useState([]);

	useEffect(() => {
		// Set the trip plan details when the component mounts
		const savedTripPlanDetails = getSavedTripPlanDetails();
		setTripPlanDetails(savedTripPlanDetails);
	}, []);

	const getSavedTripPlanDetails = () => {
		// Mock function to fetch trip plan details from storage
		return [
			{
				date: "2023-06-01",
				start_location: "Museum",
				start_time: "09:00",
				visits: [
					{
						place: "Museum",
						travel_time: "#",
						start_time: "09:00",
						end_time: "11:00",
						stay_duration: "#",
					},
					{
						place: "Park",
						travel_time: "#",
						start_time: "12:00",
						end_time: "14:00",
						stay_duration: "#",
					},
				],
			},
			{
				date: "2023-06-02",
				start_location: "Zoo",
				start_time: "10:00",
				visits: [
					{
						place: "Zoo",
						travel_time: "#",
						start_time: "10:00",
						end_time: "11:00",
						stay_duration: "#",
					},
					{
						place: "Park",
						travel_time: "#",
						start_time: "12:00",
						end_time: "14:00",
						stay_duration: "#",
					},
				],
			},
		];
	};

	return (
		<Layout style={{ height: "100vh" }}>
			<PageHeader />
			<h1>My Plan</h1>
			<Tabs>
				{tripPlanDetails.map((detail, index) => (
					<TabPane
						tab={
							<span>
								<CalendarOutlined />
								Day {index + 1}
							</span>
						}
						key={index}
					>
						<div>
							<h3>Date: {detail.date}</h3>
							<p>Start Location: {detail.start_location}</p>
							<p>Start Time: {detail.start_time}</p>

							<h4>Visits:</h4>
							{detail.visits.map((visit, visitIndex) => (
								<div key={visitIndex}>
									<p>Place: {visit.place}</p>
									<p>Travel Time: {visit.travel_time}</p>
									<p>Start Time: {visit.start_time}</p>
									<p>End Time: {visit.end_time}</p>
									<p>Stay Duration: {visit.stay_duration}</p>
								</div>
							))}
						</div>
					</TabPane>
				))}
			</Tabs>
			<Button onClick={() => navigate(-1)}>Go Back</Button>
		</Layout>
	);
}
