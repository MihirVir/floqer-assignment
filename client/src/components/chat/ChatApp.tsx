import { useState, useEffect, useRef } from "react";
import { CiChat2 } from "react-icons/ci";

type MsgType = {
  response: string;
  user: string;
};

const ChatApp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<MsgType[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [msg, setMsg] = useState<MsgType>({ response: "", user: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const lastMsg = useRef<HTMLDivElement | null>(null);

  function handleChatOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(`client websocket connection established`);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
      setLoading(false);
    };

    socket.onclose = () => {
      console.log(`websocket connection closed`);
    };

    // performing clean ups
    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lastMsg.current) {
      lastMsg.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMsg({ response: event.target.value, user: "client" });
  }

  function sendMessage() {
    if (socketRef.current && msg.response.trim() !== "") {
      setLoading(true);
      socketRef.current.send(msg.response);
      setMessages((prev) => [
        ...prev,
        { response: msg.response, user: "client" },
      ]);
      setMsg({ response: "", user: "" });
    }
  }

  return (
    <>
      <div
        onClick={handleChatOpen}
        className="cursor-pointer absolute bottom-10 right-5 bg-slate-900 flex items-center justify-center text-white"
        style={{ height: "60px", width: "60px", borderRadius: "50%" }}
      >
        <CiChat2 className="font-extrabold text-2xl" />
      </div>
      {isOpen && (
        <div
          className="absolute overflow-scroll bottom-28 right-5 bg-slate-50 border-2 border-black p-2 flex justify-between flex-col"
          style={{ width: "20vw", height: "50vh" }}
        >
          <div>
            {messages.map((msg, index) => (
              <p
                key={index}
                className="mb-2 bg-black text-white p-2 rounded-lg"
              >
                <span
                  className={`${msg.user === "client" ? "text-red-300" : "text-purple-500"}`}
                >
                  {msg.user === "client" ? "You: " : "Server: "}
                </span>
                {msg.response}
              </p>
            ))}
            {loading && <span>Typing...</span>}
          </div>
          <div>
            <input
              value={msg.response}
              onChange={(e) => handleMessageChange(e)}
              className="p-2 border-2 border-black w-full mb-2"
              placeholder="hey"
              type="text"
            />
            <button onClick={sendMessage} className="bg-green-400 w-full p-2">
              Send Message
            </button>
          </div>
          <div ref={lastMsg} />
        </div>
      )}
    </>
  );
};

export default ChatApp;
