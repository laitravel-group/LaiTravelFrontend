import React from "react";
import { Layout, Button, Col } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function UserPage(props) {
  return (
    <Layout style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
      <div className="background-image"></div>

      <Col className="home-panel">
        <Content style={{ marginTop: "150px" }}>
          <div className="button-column">
            <Link to="/new_plan">
              <Button
                type="primary"
                id="home-new-trip-button"
                className="ant-btn-header"
              >
                New Plan
              </Button>
            </Link>

            <Link to="/my_plans">
              <Button
                type="primary"
                id="user-my-trip-button"
                className="ant-btn-header"
              >
                My Plan
              </Button>
            </Link>

            <Link to="/profile">
              <Button
                type="primary"
                id="user-profile-button"
                className="ant-btn-header"
              >
                Profile
              </Button>
            </Link>

            <Link to="/edit_profile">
              <Button
                type="primary"
                id="user-edit-profile-button"
                className="ant-btn-header"
              >
                Edit Profile
              </Button>
            </Link>
          </div>
        </Content>
      </Col>

      <div className="profile-panel">
        <div className="profile-info">
          <div className="profile-picture"></div>
          <div className="user-name">XXX XX</div>
          <div className="email">XXXXX@example.com</div>
        </div>
      </div>

      <Button
        type="primary"
        className="sign-out-button"
        icon={<LogoutOutlined />}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        Sign Out
      </Button>

      <style>
        {`
          .background-image {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${process.env.PUBLIC_URL}/pic.png);
            background-size: cover;
            background-position: center;
            opacity: 0.5;
          }

          .home-panel {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 200px;
            background-color: transparent;
            padding: 20px;
            margin-right: 20px;
          }

          .button-column {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .button-column button.ant-btn-header {
            display: block;
            margin-bottom: 10px;
            background-color: yellow;
            color: black;
            border: none;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
          }

          .profile-panel {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 500px;
            top: 50%;
            transform: translateY(-50%);
            width: 200px;
            background-color: yellow;
            padding: 20px;
            text-align: center;
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
            margin-top: 50px;
          }
        `}
      </style>
    </Layout>
  );
}
