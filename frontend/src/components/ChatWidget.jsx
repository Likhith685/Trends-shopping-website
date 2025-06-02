import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { backendUrl } = useContext(ShopContext);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(`${backendUrl}/api/chat`, { messages: newMessages });
      setMessages([...newMessages, res.data.reply]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        💬
      </div>

      {open && (
        <div className="w-80 mt-2 bg-white shadow-xl rounded-xl flex flex-col overflow-hidden max-h-[32rem]">
          <div className="bg-blue-600 text-white p-3 font-semibold">
            Chat with us
          </div>

          <div className="flex-1 h-80 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t flex">
            <input
              className="flex-1 p-2 text-sm outline-none"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-blue-600 text-white text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
