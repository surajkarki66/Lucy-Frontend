import React from "react";
import "./SideBar.css";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

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
          <li onClick={() => setContent("Intent")}>
            <PsychologyIcon className="icon" />
            <span>Intent</span>
          </li>
          <li onClick={() => setContent("Feedback")}>
            <PersonIcon className="icon" />
            <span>Feedback</span>
          </li>
          <li onClick={() => setContent("Query")}>
            <NotificationsNoneIcon className="icon" />
            <span>Query</span>
          </li>
          <li onClick={() => setContent("Response")}>
            <QuestionAnswerIcon className="icon" />
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
