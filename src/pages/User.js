import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Button, Col } from "antd";
import PageHeader from "../components/PageHeader";
import User from "./pages/User";
import MyPlans from "./pages/MyPlans";
import NewPlan from "./pages/NewPlan";

const { Content } = Layout;

export default function User(props) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Col className="home-panel">
        <Content style={{ marginTop: "50px" }}>
          <Link to="/new_plan">
            <Button type="primary" id="home-new-trip-button">
              New Plan
            </Button>
          </Link>

          <Link to="/my_plans">
            <Button type="primary" id="user-my-trip-plans-history-button">
              My Plan
            </Button>
          </Link>

          <Link to="/profile">
            <Button type="primary" id="user-profile-button">
              Profile
            </Button>
          </Link>

          <Link to="/edit_profile">
            <Button type="primary" id="user-edit-profile-button">
              Edit Profile
            </Button>
          </Link>
        </Content>
      </Col>

      <div className="profile-panel">
        <div className="profile-info">
          <div className="profile-picture"></div>
          <div className="user-name">XXX XX</div>
          <div className="email">XXXXX@example.com</div>
        </div>
        <Button
          type="primary"
          className="sign-out-button"
          icon={<LogoutOutlined />}
        >
          Sign Out
        </Button>
      </div>

      <style>
        {`
          .profile-panel {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 200px;
            background-color: #f1f1f1;
            padding: 20px;
          }

          .profile-picture {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 auto;
          }

          .user-name,
          .email {
            text-align: center;
            margin-top: 10px;
          }
        `}
      </style>
    </Layout>
  );
}
