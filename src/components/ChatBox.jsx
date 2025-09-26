import React, { useState, useEffect } from "react";
import { fetchRemarks, postRemark } from "../services/api";

const ChatBox = ({ roomId, userName, socket }) => {
  const [remarks, setRemarks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Load existing remarks from backend
    const loadRemarks = async () => {
      const data = await fetchRemarks(roomId);
      setRemarks(data);
    };
    loadRemarks();
  }, [roomId]);

  const sendRemark = async () => {
    if (!text.trim()) return;

    const remark = { roomId, userName, text };
    await postRemark(remark);

    // Optimistically update local remarks
    setRemarks((prev) => [...prev, remark]);
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {remarks.map((r, i) => (
          <div key={i} className={`p-2 rounded-md ${r.userName === userName ? "bg-space-blue/30 self-end" : "bg-white/10 self-start"}`}>
            <span className="font-bold">{r.userName}: </span>
            <span>{r.text}</span>
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t border-white/20">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-l-md bg-white/5 text-white placeholder-space-gray-400 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendRemark}
          className="px-4 py-2 bg-space-blue rounded-r-md hover:bg-space-green transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;