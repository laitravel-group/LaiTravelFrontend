import React, { useState, useEffect } from "react";
import { Layout, Tabs, Button, Timeline } from "antd";
import { useNavigate } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";
import PageHeader from "../components/PageHeader";

const { TabPane } = Tabs;

export default function MyPlans(props) {
  const navigate = useNavigate();
  const [tripPlanDetails, setTripPlanDetails] = useState([]);

  useEffect(() => {
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
          {
            place: "Restaurant",
            travel_time: "#",
            start_time: "16:00",
            end_time: "18:00",
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
      {
        date: "2023-06-03",
        start_location: "Bar",
        start_time: "10:00",
        visits: [
          {
            place: "Bar",
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
              <Timeline mode="alternate">
                {detail.visits.map((visit, visitIndex) => (
                  <Timeline.Item key={visitIndex}>
                    <h4>
                      {visit.start_time} - {visit.end_time}
                    </h4>
                    <p>{visit.place}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </TabPane>
        ))}
      </Tabs>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Layout>
  );
}
