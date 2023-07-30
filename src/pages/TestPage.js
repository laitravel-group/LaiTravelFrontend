import React from "react";
import { tripPlanJson } from "../models/testData";
import { TripPlan } from "../models/tripPlan";
import OptimizePlan from "../components/OptimizePlan";

export default function TestPage() {
  const tripPlan = TripPlan.fromJson(tripPlanJson);
  return <OptimizePlan tripPlan={tripPlan} />;
}
