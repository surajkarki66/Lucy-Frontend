import { SyntheticEvent, useState } from "react";
import Switch from "@mui/material/Switch";
import "./SendMessage.css";
import SpeechRecognition from "../../SpeechRecognition/SpeechRecognition";

type PropsType = {
  askLucy: (message: string) => Promise<void>;
  loading: boolean;
  setTTSEnable: React.Dispatch<React.SetStateAction<boolean>>;
  ttsEnable: boolean;
};

const SendMessage: React.FC<PropsType> = ({
  askLucy,
  loading,
  setTTSEnable,
  ttsEnable,
}) => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    askLucy(msg);
    setMsg("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="submitButton">
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
          <SpeechRecognition setMsg={setMsg} askLucy={askLucy} loading />
          <Switch
            checked={ttsEnable}
            onChange={() => setTTSEnable(!ttsEnable)}
            name="Enable TTS"
            color="primary"
          />
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
