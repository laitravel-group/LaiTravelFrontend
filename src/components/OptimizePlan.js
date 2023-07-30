import React, { useEffect, useState } from "react";
import { Layout, Timeline, Button } from "antd";
import PageHeader from "../components/PageHeader";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function OptimizePlan({ desiredPlan }) {
  // Store all retrieved travel plan details
  const [tripPlanDetails, setTripPlanDetails] = useState([]);
  // Store the selected travel plan details (in this case, the first plan)
  const [tripPlan, setTripPlan] = useState(null);
  const navigate = useNavigate();

  const ownerId = "your-owner-id"; // Modify as needed

  useEffect(() => {
    // Send a request to the backend to get travel plan details
    fetch("/api/trip-plan-build", {
      method: "POST",
      body: JSON.stringify({
        desired_plan: desiredPlan, // Use the desired plan passed as props
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTripPlanDetails(data.proposed_plans);
        // Select the first plan for display
        setTripPlan(data.proposed_plans[0]);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [desiredPlan]); // Use desiredPlan as a dependency

  const handleSave = (plan) => {
    // Send a request to the backend to save the selected travel plan
    fetch("/api/trip-plan-save", {
      method: "POST",
      body: JSON.stringify(plan),
      headers: {
        "Content-Type": "application/json",
      },
      // Add ownerId as a query parameter (adjust as needed)
      params: {
        ownerId: ownerId,
      },
    })
      .then((res) => {
        if (res.ok) {
          // Logic for successful save
          console.log("Trip plan saved successfully!");
        } else {
          // Handle possible error response
          console.error("Failed to save trip plan:", res.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
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
