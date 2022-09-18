import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import Tables from "../Table/Table";
import jwt from 'jwt-decode'

import './Home.css'
import { ADMINLOGIN } from "../../Constants/RoutesConstants";
import Spinner from "../../Loaders/Spinner";

const AdminPageHome = () => {
  const navigate = useNavigate();
  const logoutButtonHandler = () => {
          localStorage.removeItem('tokan')
          navigate(ADMINLOGIN);
          window.location.reload();
  };
  const [content, setContent] = useState('Feedbacks')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokan')
    let user;
    if(token) user = jwt(token)
    console.log(user)
    if(!user?.user_id) navigate(ADMINLOGIN)
    setIsLoading(false)
  }, [])

  if(isLoading) return <Spinner />

  // Check if user in cookies or localstorage if not then navigate login page
  return (
    <div className="adminhome">
            <SideBar logoutButtonHandler={logoutButtonHandler} setContent={setContent}/>
            <div className="homeContainer">
                <NavBar />
                  <Tables content={content}/>
            </div>
        </div>
  );
};

export default AdminPageHome;