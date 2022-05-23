import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Outlet, Link } from "react-router-dom";
import './App.less';
import { useLocalStorage } from "./common/useLocalStorage";

export default function App() {
  const [name, setName] = useLocalStorage("name", false);
  const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);

  function handleLogOut() {
    localStorage.clear();
    window.location.reload(false);
  }
  return (
    <div>
      <h1>Love Animals</h1>
      {name && <h5 style={{ float: "right", }} >Hi, {name}</h5>}
      {/* <nav style={{ paddingBottom: "1rem" }} > */}
      {name && <Link style={{ float: "right", paddingRight: "1rem",}} onClick={handleLogOut} to="/" >LogOut</Link>}
      {!name && <Link style={{ float: "right", paddingRight: "1rem",}} to="/login">Login</Link>}
      {!name && <Link style={{ float: "right", paddingRight: "1rem",}} to="/register">Register</Link>}
      {/* </nav> */}
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Button style={{marginLeft: "26px", marginRight: "26px"}} type="primary" size={"large"}>
          <Link to="/home">Home</Link>
        </Button>
        <Button style={{marginRight: "26px"}} type="primary" size={"large"} >
          <Link to="/adoption">Adoption</Link>
        </Button>
        <Button style={{marginRight: "26px"}} type="primary" size={"large"}>
          <Link to="/centres">Centres</Link>
        </Button>
        {name && 
          <Button style={{marginRight: "26px"}} type="primary" size={"large"}>
            <Link to="/bookmarks">Bookmarks</Link>
          </Button>
        }
        {isAdmin && 
          <Button style={{marginRight: "26px"}} type="primary" size={"large"}>
            <Link to="/newcomer">New comer</Link>
          </Button>
        }
  
      </nav>
      <Outlet />
    </div>
  );
}