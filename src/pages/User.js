import React, { useState } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Button, Col } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function UserPage(props) {
  const [showProfilePanel, setShowProfilePanel] = useState(true);
  const [showMyPlansPanel, setShowMyPlansPanel] = useState(false);

  const handleMyPlansClick = () => {
    setShowProfilePanel(false);
    setShowMyPlansPanel(true);
  };

  const handleProfileClick = () => {
    setShowProfilePanel(true);
    setShowMyPlansPanel(false);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Col className="home-panel">
        <Content style={{ marginTop: "50px" }}>
          <Link to="/new_plan">
            <Button
              type="primary"
              id="home-new-trip-button"
              className="yellow-button"
            >
              New Plan
            </Button>
          </Link>

          <Link to="/my_plans">
            <Button
              type="primary"
              id="user-my-trip-button"
              className="yellow-button"
              onClick={handleMyPlansClick}
            >
              My Plan
            </Button>
          </Link>

          <Link to="/profile">
            <Button
              type="primary"
              id="user-profile-button"
              className="yellow-button"
              onClick={handleProfileClick}
            >
              Profile
            </Button>
          </Link>

          <Link to="/edit_profile">
            <Button
              type="primary"
              id="user-edit-profile-button"
              className="yellow-button"
              onClick={handleProfileClick}
            >
              Edit Profile
            </Button>
          </Link>
        </Content>
      </Col>

      {showProfilePanel && (
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
      )}

      {showMyPlansPanel && (
        <div className="yellow-panel">
          <div className="yellow-panel-content">
            List of trip plans historys
          </div>
        </div>
      )}

      <style>
        {`
          .home-panel button {
            background-color: yellow;
            color: black;
          }

          .yellow-panel {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 200px;
            background-color: yellow;
            padding: 20px;
          }

          .yellow-panel-content {
            text-align: center;
          }

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
