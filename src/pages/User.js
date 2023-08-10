import React,{ useContext, useEffect } from "react";
import { Col, Row } from "antd";
import PageHeader from "../components/PageHeader";
import { Button } from "antd";
import { Avatar, Image, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { AuthContext } from "../App";
import { getUser } from "../api";

const { Header, Content, Sider } = Layout;

export default function User(props) {
  const auth = useContext(AuthContext);
  // if (!auth.authed) {
  //   return (<PageHeader /> );
  // } 
   const user = null;
   if (auth.authed){
    const user = getUser();
   }
	
  
	
  
  const { token } = theme.useToken();

  return (
    <Layout >
      <PageHeader />
      <Layout>
        <Layout
          style={{
            padding: "100px",
            minHeight: 280,
          }}
        >
          <Sider
            style={{
              margin: "10px",
              background: "transparent",
            }}
            span={10} 
          >
            <Button type="primary" className="user-button" href= "/new_plan" shape="round" block>
              New Plans
            </Button>
            <Button type="primary" className="user-button" href= "/my_plans" shape="round" block>
              My Plans
            </Button>
            <Button type="primary" className="user-button" href= "/user" shape="round" block>
              Profile
            </Button>
            <Button type="primary" className="user-button" href= "/profile" shape="round" block>
              Edit Profile
            </Button>
          </Sider>
          <Col span={8}></Col>

          <Content style={{ backgroundColor:"Scrollbar"}} >
            <Row justify="center" style={{ margin: "10px" }}>
              <Avatar
                icon={(user === null) ? <UserOutlined /> : user.avatar}
                size={150}
  
                style={{
                  // color: "black",
                  backgroundColor:"darkseagreen",
                  margin: '16px',
                  verticalAlign: 'middle'
                }}
              />
            </Row>

            <Row justify="center">
              {" "}
              <Button type="primary" className="profile-button" block>
                  {(user === null) ? "UserName" : user.username}
              </Button>
            </Row>
            <Row justify="center">
              {" "}
              <Button type="primary" className="profile-button" block>
                  {(user === null) ? "DisplayName" : user.displayname}
              </Button>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
