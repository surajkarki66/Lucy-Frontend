import "./ChatMessage.css";
import LucyBlack from "../../../assets/images/LucyBlack.png";
import User from "../../../assets/images/User.png";

type PropsType = {
  message: string;
  link: string;
  id: string;
};

const ChatMessage: React.FC<PropsType> = ({ message, id, link }) => {
  return (
    <div>
      <div className={`msg ${id === "lucy" ? "received" : "sent"}`}>
        <img
          src={id === "lucy" ? LucyBlack : User}
          alt={id === "lucy" ? "Lucy" : "User"}
        />
        <p>
          {message}{" "}
          {link && (
            <a key={id} href={link} target="__blank">
              {link}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};
export default ChatMessage;
