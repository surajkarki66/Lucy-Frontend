import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import Tables from "../Table/Table";
import { jwtDecode } from "jwt-decode";

import "./Home.css";
import { signOut } from "../../../helpers/auth";
import { ADMINLOGIN } from "../../Constants/RoutesConstants";
import Spinner from "../../Loaders/Spinner";

const AdminPageHome = () => {
  const navigate = useNavigate();
  const logoutButtonHandler = () => {
    signOut(() => {
      window.location.href = ADMINLOGIN;
    });
  };
  const [content, setContent] = useState("Intent");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token_lucy");

    if (token) {
      const user: { user_id: string; role: string; iat: string; exp: string } =
        jwtDecode(token);
      if (!user?.user_id) navigate(ADMINLOGIN);
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) return <Spinner />;

  // Check if user in cookies or localstorage if not then navigate login page
  return (
    <div className="adminhome">
      <SideBar
        logoutButtonHandler={logoutButtonHandler}
        setContent={setContent}
      />
      <div className="homeContainer">
        <NavBar />
        <Tables content={content} />
      </div>
    </div>
  );
};

export default AdminPageHome;
