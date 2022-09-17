import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import Tables from "../Table/Table";
import './Home.css'
import { ADMINLOGIN } from "../../Constants/RoutesConstants";

const AdminPageHome = () => {
  const navigate = useNavigate();
  const logoutButtonHandler = () => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate(ADMINLOGIN);
  };
  const [content, setContent] = useState('Feedbacks')

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