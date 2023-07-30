import React, { useEffect, useState } from "react";
import { Layout, Timeline, Button } from "antd";
import PageHeader from "../components/PageHeader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { buildTripPlan, saveTripPlan } from "../api";

export default function OptimizePlan({ desiredPlan }) {
  const [tripPlanDetails, setTripPlanDetails] = useState([]);
  const [tripPlan, setTripPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    buildTripPlan(desiredPlan)
      .then((data) => {
        setTripPlanDetails(data.proposed_plans);
        setTripPlan(data.proposed_plans[0]);
      })
      .catch((error) => {
        console.error("Failed to generate a trip plan:", error);
      });
  }, [desiredPlan]);

  const handleSave = (plan) => {
    saveTripPlan(plan)
      .then(() => {
        console.log("Trip plan saved successfully!");
      })
      .catch((error) => {
        console.error("Failed to save the trip plan:", error);
      });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader />
      <h1>My Plan</h1>
      {tripPlan ? (
        <div>
          <h3>Date: {dayjs(tripPlan.date).format("YYYY-MM-DD")}</h3>
          <p>Start Location: {tripPlan.startLocation.name}</p>
          <p>Start Time: {dayjs(tripPlan.startTime).format("HH:mm")}</p>
          <h4>Visits:</h4>
          <Timeline mode="alternate">
            {tripPlan.visits.map((visit, visitIndex) => (
              <Timeline.Item key={visitIndex}>
                <h4>
                  {dayjs(visit.startTime).format("HH:mm")} -
                  {dayjs(visit.endTime).format("HH:mm")}
                </h4>
                <p>{visit.place.name}</p>
              </Timeline.Item>
            ))}
          </Timeline>
          <Button onClick={() => handleSave(tripPlan)}>Save</Button>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
