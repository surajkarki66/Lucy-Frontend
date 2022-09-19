import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Nav from "./components/Navs/Nav";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import ChatPage from "./pages/ChatPage/ChatPage";
import FeedbackPage from "./pages/Feedback/FeedbackPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import AdminPageHome from "./components/Admin/Home/Home";

const App: React.FC = () => {
  const location = useLocation();
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminPageHome />} />
    </Routes>
  );
  return (
    <>
      <ToastContainer position="top-center" />
      {location?.pathname !== "/" && <Nav />}
      {routes}
    </>
  );
};

export default App;
