import { useEffect, useRef, useState } from "react";

import "./ChatPage.css";
import Axios from "../../axios-url";
import ChatMessage from "../../components/Chat/ChatMessage/ChatMessage";
import SendMessage from "../../components/Chat/SendMessage/SendMessage";

const Chat: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const scroll = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { message: "Hello! This is Lucy, NEC chatbot", id: "lucy", links: [] },
  ]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askLucy = async (msg: string) => {
    setMessages((message) => [
      ...message,
      { message: msg, id: "user", links: [] },
    ]);
    try {
      setLoading(true);
      const { data } = await Axios.get(`/bot/chat?message=${msg}`);
      setMessages((message) => [
        ...message,
        { message: data.message, id: "lucy", links: data.links },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className='chat-page' style={{ paddingBottom: "80px" }}>
      <div className="msgs">
        {messages.map((m, id) => (
          <ChatMessage key={id} id={m.id} message={m.message} links={m.links} />
        ))}
      </div>
        <SendMessage askLucy={askLucy} loading={loading} />
        <div ref={scroll}></div>
    </div>
  );
};

export default Chat;
