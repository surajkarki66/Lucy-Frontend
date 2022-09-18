import "./Nav.css";

import { Link, useLocation } from "react-router-dom";

import Lucy from "../../assets/images/Lucy.png";
import { useEffect, useState } from "react";
import jwt from 'jwt-decode'


const Nav = () => {

  const location = useLocation();
  
  const [isAdmin, setIsAdmin ] = useState(false)
    
    useEffect(() => {
      console.log(location.pathname)
        const token = localStorage.getItem('tokan')
        let user;
        if(token) user = jwt(token)
        if(user?.role === 'admin') setIsAdmin(true)
    }, [location?.pathname, ])


  return (
    <div className="nav--container">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <div className="home">
          <img src={Lucy} style={{ height: "60px" }} alt="HOME"></img>
        </div>
      </Link>

      <li className="navigation">
        {isAdmin && (
          <>
            <Link to="/admin" style={{ textDecoration: "none", color: "white" }}>
            <ul className={`${location?.pathname === '/admin' && 'active'}`}> Dashboard</ul>
            </Link>
              <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
              <ul className={`${location?.pathname === '/signup' && 'active'}`}> Register</ul>
            </Link>
        </>
        )}
        <Link to="/chat" style={{ textDecoration: "none", color: "white" }}>
          <ul className={`${location?.pathname === '/chat' && 'active'}`}> Chat</ul>
        </Link>
        <Link to="/aboutUs" style={{ textDecoration: "none", color: "white" }}>
          <ul className={`${location?.pathname === '/aboutUs' && 'active'}`}> About</ul>
        </Link>
        <Link to="/feedback" style={{ textDecoration: "none", color: "white" }}>
          <ul className={`${location?.pathname === '/feedback' && 'active'}`}> Feedback</ul>
        </Link>
      </li>
    </div>
  );
};

export default Nav;
