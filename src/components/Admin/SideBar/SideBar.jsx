import './SideBar.css'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { Link } from 'react-router-dom';
import { ADMINLOGIN } from '../../Constants/RoutesConstants';

const SideBar = ({logoutButtonHandler, setContent}) => {
    return (
        <div className="sidebar">

            <div className="center">
        <ul>
          <p className="title">MAIN</p>
            <li onClick={() => setContent('Feedbacks')}>
              <PersonOutlineIcon className="icon" />
              <span>Feedback</span>
            </li>
            <li onClick={() => setContent('Querys')}>
              <NotificationsNoneIcon className="icon" />
              <span>Querys</span>
            </li>
          <li onClick={() => setContent('Responses')}>
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
    )
    
}
export default SideBar;