import React, { useEffect, useState } from 'react';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';

import { Button, Layout, Menu, Col, Row } from 'antd';
import { Outlet, Link } from "react-router-dom";
import './App.less';
import { useLocalStorage } from "./utilities/useLocalStorage";

const { Header, Footer, Sider, Content } = Layout;


export default function App() {

  const [name, setName] = useLocalStorage("name", false);
  const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);

  function handleLogOut() {
    localStorage.clear();
    window.location.reload(false);
  }
  return (
    <div>
      <Layout hasSider>
      <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#d5f3fb"
      }}
    >
      <div style={{ height: 32, margin: 16, backgroundColor: "#ffffff" }} />
      <Menu>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/adoption">Adopt Dog</Link>
        </Menu.Item>
        {name && 
        <Menu.Item>
          <Link to="/bookmarks">Bookmarks</Link>
        </Menu.Item>
        }
        <Menu.Item>
          <Link to="/centres">Shops</Link>
        </Menu.Item>
        
        { isAdmin &&
          <Menu.Item>
            <Link to="/newcomer">Add Dog</Link>
          </Menu.Item>
        }
      </Menu>
      </Sider>
      <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
      }}
    >
        <Header
          className="site-layout-background"
          style={{ backgroundColor: "#d5f3fb" }}
        >
          <Row>
            <Col span={1}><img width="80" src={"https://cdn.iconscout.com/icon/premium/png-256-thumb/adoption-4045702-3341893.png"}/></Col>
            <Col span={23}><h1>Adopt Dogs</h1></Col>
          </Row>
        </Header>
        <Layout>
          <Header
          className="site-layout-background"
          style={{ backgroundColor: "#d5f3fb" }}
          >

      {name && <h5 style={{ float: "right", }} >Hi, {name}</h5>}
      {name && <Link style={{ float: "right", paddingRight: "1rem",}} onClick={handleLogOut} to="/" >Logout</Link>}
      {!name && <Link style={{ float: "right", paddingRight: "1rem",}} to="/login">Login</Link>}
      {!name && <Link style={{ float: "right", paddingRight: "1rem",}} to="/register">Register</Link>}
          </Header>
        </Layout>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
          </div><Outlet />
          
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Adopt Dogs ©2022 Created by Wan Tim Kwai
          </Footer>
      </Layout>
    </Layout>
    </div>
  );
}