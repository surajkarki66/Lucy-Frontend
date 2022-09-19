import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import Axios from "../../../axios-url";
import "../Auth.css";
import { LOGINAPI } from "../../Constants/ApiConstants";
import { toast } from "react-toastify";
import { ADMINDASHBOARD } from "../../Constants/RoutesConstants";
import Spinner from "../../Loaders/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    Axios.post(LOGINAPI, data)
      .then((response) => {
        localStorage.setItem("token", response?.data?.access_token);
        const user: {
          user_id: string;
          role: string;
          iat: string;
          exp: string;
        } = jwt(response?.data?.access_token);

        if (user?.role === "admin") {
          navigate("/admin");
        } else {
          toast.error("Authorization Admin Failed!");
        }
        //Set in localstorage or cookies
      })
      .catch((error) => {
        toast.error(error.response.data.detail);
      });
  };
  const [isLogedIn, setisLogedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("tokan");

    if (token) {
      const user: { user_id: string; role: string; iat: string; exp: string } =
        jwt(token);
      if (user?.role === "admin") setisLogedIn(true);
    }
    setIsLoading(false);
  }, []);

  if (isLogedIn) {
    return <Navigate to={ADMINDASHBOARD} />;
  } else if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="Container">
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={submitHandler}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              maxLength={255}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
