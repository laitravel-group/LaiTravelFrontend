import React, { useState } from "react";
import { Layout, Button, Col } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function UserPage(props) {
  const [showProfile, setShowProfile] = useState(true);
  const [showMyPlans, setShowMyPlans] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("XXX XX");
  const [email, setEmail] = useState("XXXXX@example.com");

  const handleMyPlansClick = () => {
    setShowProfile(false);
    setShowMyPlans(true);
    setEditMode(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowMyPlans(false);
    setEditMode(false);
  };

  const handleEditProfileClick = () => {
    setShowProfile(true);
    setShowMyPlans(false);
    setEditMode(true);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Layout
      style={{
        height: "100vh",
        backgroundImage: "url(./pic.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Col className="home-panel">
        <Content style={{ marginTop: "150px" }}>
          <div className="button-column">
            <Button
              type="primary"
              id="home-new-trip-button"
              className="ant-btn-header"
              onClick={handleProfileClick}
            >
              New Plan
            </Button>

            <Button
              type="primary"
              id="user-my-trip-button"
              className="ant-btn-header"
              onClick={handleMyPlansClick}
            >
              My Plan
            </Button>

            <Button
              type="primary"
              id="user-profile-button"
              className="ant-btn-header"
              onClick={handleProfileClick}
            >
              Profile
            </Button>

            <Button
              type="primary"
              id="user-edit-profile-button"
              className="ant-btn-header"
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </Button>
          </div>
        </Content>
      </Col>

      {showProfile && (
        <div className="profile-panel">
          <div className="profile-info">
            <div className="profile-picture"></div>
            {editMode ? (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <input type="text" value={email} onChange={handleEmailChange} />
              </>
            ) : (
              <>
                <div className="user-name">{username}</div>
                <div className="email">{email}</div>
              </>
            )}
          </div>
        </div>
      )}

      {showMyPlans && (
        <div className="my-plans-panel">
          <div className="my-plans-header">List of trip plans historys</div>
          <div className="my-plans-list">
            {/* Render trip plans historys here */}
          </div>
          <div className="empty-spaces"></div>
        </div>
      )}

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
          .home-panel {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 600px;
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

          .profile-panel,
          .my-plans-panel {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 30%;
            top: 50%;
            transform: translate(0, -50%);
            width: 200px;
            background-color: yellow;
            padding: 150px;
            text-align: center;
            opacity: 0.9;
          }

          .profile-panel {
            display: ${showProfile ? "flex" : "none"};
          }

          .my-plans-panel {
            display: ${showMyPlans ? "flex" : "none"};
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
            margin-top: 10px;
          }

          .my-plans-header {
            font-weight: bold;
          }

          .my-plans-list {
            margin-top: 10px;
          }

          .empty-spaces {
            height: 100px;
          }
        `}
      </style>
    </Layout>
  );
}
