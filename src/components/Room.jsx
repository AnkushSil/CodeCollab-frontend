import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import SpaceBackground from "./SpaceBackground";
import GlassPanel from "./GlassPanel";
import NeonButton from "./NeonButton";

const socket = io("http://localhost:5000");

const Room = ({ roomIdProp, userNameProp, onLeave }) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [output, setOutput] = useState("");

  const roomId = roomIdProp;
  const userName = userNameProp;

  useEffect(() => {
    socket.emit("join", { roomId, userName });

    socket.on("userJoined", (users) => setUsers(users));
    socket.on("codeUpdate", (newCode) => setCode(newCode));
    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });
    socket.on("languageUpdate", (newLanguage) => setLanguage(newLanguage));

    return () => {
      socket.emit("leaveRoom");
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
    };
  }, [roomId, userName]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const runCode = async () => {
    try {
      const res = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <>
      <SpaceBackground />
      <div className="h-screen flex">
        {/* Sidebar */}
        <aside className="w-80 min-w-72 p-6 bg-white/5 backdrop-blur-2xl border-r border-white/10 overflow-y-auto flex flex-col">
          <GlassPanel className="p-4 mb-6">
            <h2 className="text-lg font-bold mb-4">Code Room: {roomId}</h2>
            <div className="flex justify-center">
              <NeonButton variant="accent" size="md" onClick={copyRoomId}>
                Copy Room ID
              </NeonButton>
            </div>
            {copySuccess && (
              <div className="mt-2 text-center">
                <span className="text-space-green text-xs">{copySuccess}</span>
              </div>
            )}
          </GlassPanel>

          <GlassPanel className="p-4 mb-6">
            <h3 className="text-base font-bold mb-2">Select Language</h3>
            <select
              className="w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-space-blue"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
              <option value="c">C</option>
            </select>
          </GlassPanel>

          <GlassPanel className="p-4 mb-6 flex-1">
            <h3 className="text-base font-bold mb-2">Active Coders:</h3>
            <ul className="space-y-2 mb-4">
              {users.map((user, index) => (
                <li
                  key={index}
                  className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white/80"
                >
                  {user.slice(0, 12)}...
                </li>
              ))}
            </ul>
            <p className="text-space-green text-sm mb-2 min-h-[20px]">{typing}</p>
          </GlassPanel>

          <NeonButton
            className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white border-red-500 hover:border-red-600"
            outline
            onClick={onLeave}
          >
            Exit Space
          </NeonButton>
        </aside>

        {/* Main coding area */}
        <main className="flex-1 flex flex-col">
          {/* Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 16,
                fontFamily: "JetBrains Mono, Fira Code, monospace",
                lineNumbers: "on",
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderWhitespace: "selection",
                cursorBlinking: "smooth",
                // removed cursorSmoothCaretAnimation to fix glitch
              }}
            />
          </div>

          {/* Run button + output */}
          <div className="p-3 bg-black/80 border-t border-white/10 h-32 overflow-auto">
            <button
              onClick={runCode}
              className="px-4 py-2 bg-space-blue text-white rounded-lg hover:bg-space-blue/80"
            >
              Run Code
            </button>
            <pre className="mt-3 text-sm text-green-300 whitespace-pre-wrap">
              {output || "Output will appear here..."}
            </pre>
          </div>
        </main>
      </div>
    </>
  );
};

export default Room;
