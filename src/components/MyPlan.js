import React from "react";
import { Layout, Timeline, Button, Tabs } from "antd";
import PageHeader from "../components/PageHeader";
import TabPane from "antd/es/tabs/TabPane";
import { CalendarOutlined } from "@ant-design/icons";

export default function MyPlans({ tripPlan }) {
  // 接收tripPlan作为props

  return (
    <Layout style={{ height: "100vh" }}>
      <PageHeader />
      <h1>My Plan</h1>
      <Tabs>
        {tripPlan.details.map(
          (
            detail,
            index // 直接使用tripPlan的details
          ) => (
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
          )
        )}
      </Tabs>
    </Layout>
  );
}
