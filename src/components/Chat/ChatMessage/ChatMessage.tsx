import "./ChatMessage.css";
import LucyBlack from "../../../assets/images/LucyBlack.png";
import User from "../../../assets/images/User.png";

type PropsType = {
  message: string;
  links: string[];
  id: string;
};

const ChatMessage: React.FC<PropsType> = ({ message, id, links }) => {
  return (
    <div>
      <div className={`msg ${id === "lucy" ? "received" : "sent"}`}>
        <img
          src={id === "lucy" ? LucyBlack : User}
          alt={id === "lucy" ? "Lucy" : "User"}
        />
        <p>
          {message}{" "}
          {links
            ? links.map((link, id) => (
                <a key={id} href={link} target="__blank">
                  {link}
                </a>
              ))
            : null}
        </p>
      </div>
    </div>
  );
};
export default ChatMessage;
