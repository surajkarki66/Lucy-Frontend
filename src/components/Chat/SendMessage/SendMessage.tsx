import { SyntheticEvent, useState } from "react";

import "./SendMessage.css";

type PropsType = {
  askLucy: (message: string) => Promise<void>;
  loading: boolean;
};

const SendMessage: React.FC<PropsType> = ({ askLucy, loading }) => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    askLucy(msg);
    setMsg("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='submitButton'>
        <div className="sendMsg">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="input-message"
            placeholder="Ask anything to Lucy !"
            type="text"
            required
          />
          <button className="btn-send" type="submit">
            {!loading ? "Send" : "Loading"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
