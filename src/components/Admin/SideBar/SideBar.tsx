import "./SideBar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import React from "react";

type PropsType = {
  logoutButtonHandler: () => void;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};
const SideBar: React.FC<PropsType> = ({ logoutButtonHandler, setContent }) => {
  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => setContent("Feedback")}>
            <PersonOutlineIcon className="icon" />
            <span>Feedback</span>
          </li>
          <li onClick={() => setContent("Query")}>
            <NotificationsNoneIcon className="icon" />
            <span>Query</span>
          </li>
          <li onClick={() => setContent("Response")}>
            <PsychologyOutlinedIcon className="icon" />
            <span>Response</span>
          </li>
          <li onClick={logoutButtonHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
