import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { SIGNUPAPI } from "../../Constants/ApiConstants";
import jwt from "jwt-decode";
import { toast } from "react-toastify";

import Axios from "../../../axios-url";
import Spinner from "../../Loaders/Spinner";
import { axiosMethod } from "../../Api/Post";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      email,
      first_name,
      last_name,
      password,
    };
    await axiosMethod({
      url: SIGNUPAPI,
      data: data,
      method: "post",
      purpose: "User registered successfully",
    });
    setfirst_name("");
    setlast_name("");
    setEmail("");
    setPassword("");
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user: { user_id: string; role: string; iat: string; exp: string } =
        jwt(token);
      if (user?.role === "admin") setIsAdmin(true);
    }
    setIsLoading(false);
  }, []);

  if (!isAdmin && !isLoading) {
    toast.warning("Unauthorized!");
    return <Navigate to="/" />;
  } else if (isLoading) {
    return <Spinner />;
  } else {
    // HTML file to show to the user
    return (
      <div className="Container">
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={submitHandler}>
            <h1>Sign Up</h1>
            <input
              type="text"
              value={first_name}
              placeholder="First Name"
              minLength={2}
              maxLength={255}
              required
              onChange={(e) => setfirst_name(e.target.value)}
            />
            <input
              type="text"
              value={last_name}
              placeholder="Last Name"
              minLength={2}
              maxLength={255}
              required
              onChange={(e) => setlast_name(e.target.value)}
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              minLength={6}
              maxLength={255}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Signup;
