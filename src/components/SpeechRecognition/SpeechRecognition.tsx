import React, { useState } from "react";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { useSpeechRecognition } from "react-speech-kit";

import "./SpeechRecognition.css";

type PropsType = {
  askLucy: (message: string) => Promise<void>;
  loading: boolean;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
};

const SpeechRecognition: React.FC<PropsType> = (props) => {
  const [lang] = useState("en-AU");
  const { askLucy, setMsg } = props;
  const [val, setVal] = useState("");
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    if (val !== "") {
      askLucy(val);
    }
  };
  const onResult = (result: string) => {
    setMsg(result);
    setVal(result);
  };
  const onError = (event: any) => {
    if (event.error === "not-allowed") {
      setBlocked(true);
    }
  };
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onError,
    onEnd,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };
  return (
    <div className="tooltip">
      <button disabled={blocked || !supported} type="button" onClick={toggle}>
        {listening && !blocked && supported ? "Stop" : "Listen"}
        {blocked || !supported ? (
          <AiOutlineAudioMuted size="1.4em" />
        ) : (
          <AiFillAudio size="1.4em" />
        )}
        {blocked && (
          <span className="tooltiptext">
            The microphone is blocked for this site in your browser.
          </span>
        )}
        {!supported && (
          <span className="tooltiptext">
            Your browser does not support Speech Recognition
          </span>
        )}
      </button>
    </div>
  );
};

export default SpeechRecognition;
