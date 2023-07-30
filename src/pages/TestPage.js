import React from "react";
import NewPlanEx from "../exported/NewPlanEx";
import { tripPlanJson } from "../models/testData";
import { TripPlan } from "../models/tripPlan";
import MyPlans from "../components/MyPlan";

export default function TestPage() {
  const tripPlan = TripPlan.fromJson(tripPlanJson);
  return <MyPlans tripPlan={tripPlan} />;
}
