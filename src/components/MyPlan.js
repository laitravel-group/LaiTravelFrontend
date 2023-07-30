import React from "react";
import { Layout, Timeline, Tabs } from "antd";
import PageHeader from "../components/PageHeader";
import { CalendarOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default function MyPlans({ tripPlan }) {
  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader />
      <h1>My Plan</h1>
      <Tabs>
        {tripPlan.details.map((detail, index) => (
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
              <h3>Date: {detail.date.format("YYYY-MM-DD")}</h3>
              <p>Start Location: {detail.startLocation.placeName}</p>
              <p>Start Time: {detail.startTime.format("HH:mm")}</p>
              <h4>Visits:</h4>
              <Timeline mode="alternate">
                {detail.visits.map((visit, visitIndex) => (
                  <Timeline.Item key={visitIndex}>
                    <h4>
                      {visit.startTime.format("HH:mm")} -{" "}
                      {visit.endTime.format("HH:mm")}
                    </h4>
                    <p>{visit.place.placeName}</p>
                    <p>{visit.place.description}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Layout>
  );
}
