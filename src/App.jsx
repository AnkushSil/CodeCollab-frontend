import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import LandingPage from "./LandingPage";
import SpaceBackground from "./components/SpaceBackground";
import GlassPanel from "./components/GlassPanel";
import NeonButton from "./components/NeonButton";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);

axios.defaults.baseURL = apiUrl;

const App = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [joined, setJoined] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("// Start coding here...");
    const [copySuccess, setCopySuccess] = useState("");
    const [users, setUsers] = useState([]);
    const [typing, setTyping] = useState("");
    const [output, setOutput] = useState("");
    const [stdin, setStdin] = useState("");
    const [remarks, setRemarks] = useState([]);
    const [remarkText, setRemarkText] = useState("");

    const handleNavigateToEditor = () => setShowLanding(false);

    const handleBackToLanding = () => {
        setShowLanding(true);
        setJoined(false);
        setRoomId("");
        setUserName("");
        setRole("");
        setCode("// start code here");
        setLanguage("javascript");
        setUsers([]);
        setTyping("");
        setRemarks([]);
    };

    useEffect(() => {
        socket.on("userJoined", (users) => setUsers(users));
        socket.on("codeUpdate", (newCode) => setCode(newCode));
        socket.on("userTyping", (user) => {
            setTyping(`${user.slice(0, 8)}... is Typing`);
            setTimeout(() => setTyping(""), 2000);
        });
        socket.on("languageUpdate", (newLanguage) => setLanguage(newLanguage));
        socket.on("remark:update", (remark) => setRemarks((prev) => [...prev, remark]));

        return () => {
            socket.off("userJoined");
            socket.off("codeUpdate");
            socket.off("userTyping");
            socket.off("languageUpdate");
            socket.off("remark:update");
        };
    }, []);

    const joinRoom = () => {
        if (roomId && userName && role) {
            socket.emit("join", { roomId, userName, role });
            setJoined(true);
        } else {
            alert("Please enter your name, room ID, and select a role.");
        }
    };

    const leaveRoom = () => {
        socket.emit("leaveRoom");
        handleBackToLanding();
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        if (role === "Developer" || role === "Admin") {
            socket.emit("codeChange", { roomId, code: newCode });
            socket.emit("typing", { roomId, userName });
        }
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        if (role === "Developer" || role === "Admin") {
            socket.emit("languageChange", { roomId, language: newLanguage });
        }
    };
    
    const runCode = async () => {
      setOutput("Running code...");
      try {
        const res = await fetch(`${apiUrl}/compile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, code, stdin }),
        });
        const data = await res.json();
        if (data.error) {
          setOutput(`Error: ${data.error}`);
        } else {
          const formattedOutput = `Status: ${data.status}\nTime: ${data.time}s | Memory: ${data.memory} KB\n\n${data.output}`;
          setOutput(formattedOutput);
        }
      } catch (err) {
        setOutput("Error: " + err.message);
      }
    };

    if (showLanding) return <LandingPage onNavigateToEditor={handleNavigateToEditor} />;

    if (!joined) return (
        <>
            <SpaceBackground />
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-lg min-h-[600px] flex flex-col">
                    <NeonButton variant="accent" outline size="md" onClick={handleBackToLanding} className="!absolute top-4 left-4 z-10">
                        ← Back to Home
                    </NeonButton>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-space-blue to-space-green bg-clip-text text-transparent">CodeCollab</h1>
                        <p className="text-center text-white/70 mb-8 text-base">Enter the collaborative coding platform</p>
                        <div className="space-y-4 w-full">
                            <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-space-blue transition-colors" />
                            <input type="text" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-space-blue transition-colors" />
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-space-blue transition-colors">
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Developer">Developer</option>
                                <option value="Tester">Tester</option>
                            </select>
                            <NeonButton className="w-full mt-6" variant="primary" size="lg" onClick={joinRoom}>Launch into Space</NeonButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <SpaceBackground />
            <div className="h-screen flex">
                <aside className="w-80 min-w-72 p-6 bg-white/5 backdrop-blur-2xl border-r border-white/10 overflow-y-auto flex flex-col">
                    <GlassPanel className="p-4 mb-6">
                        <h2 className="text-lg font-bold mb-4">Code Room: {roomId}</h2>
                        <div className="flex justify-center">
                            <NeonButton variant="accent" size="md" onClick={copyRoomId}>Copy Room ID</NeonButton>
                        </div>
                        {copySuccess && <div className="mt-2 text-center"><span className="text-space-green text-xs">{copySuccess}</span></div>}
                    </GlassPanel>
                    <GlassPanel className="p-4 mb-6">
                        <h3 className="text-base font-bold mb-2">Select Language</h3>
                        <select className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-space-blue" value={language} onChange={handleLanguageChange}>
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
                            {users.map((user, index) => (<li key={index} className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white/80">{user.slice(0, 12)}...</li>))}
                        </ul>
                        <p className="text-space-green text-sm mb-2 min-h-[20px]">{typing}</p>
                    </GlassPanel>
                    <NeonButton className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white border-red-500 hover:border-red-600" outline onClick={leaveRoom}>Exit Space</NeonButton>
                </aside>
                <main className="flex-1 flex flex-col">
                    <div className="flex-1 min-h-0">
                        <Editor
                            height="100%"
                            language={language}
                            value={code}
                            onChange={handleCodeChange}
                            theme="vs-dark"
                            options={{
                                readOnly: role === "Tester",
                                minimap: { enabled: false },
                                fontSize: 16,
                                fontFamily: "JetBrains Mono, Fira Code, monospace",
                                lineNumbers: "on",
                                wordWrap: "on",
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                renderWhitespace: "selection",
                                cursorBlinking: "smooth",
                            }}
                        />
                    </div>
                    <div className="p-3 bg-black/80 border-t border-white/10 flex flex-col h-48">
                        <div className="flex items-center gap-4 mb-2">
                            <NeonButton onClick={runCode}>Run Code</NeonButton>
                            <textarea
                                value={stdin}
                                onChange={(e) => setStdin(e.target.value)}
                                placeholder="Enter input (stdin) here..."
                                className="flex-1 p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-space-blue text-sm h-10"
                                rows={1}
                            />
                        </div>
                        <pre className="flex-1 mt-2 text-sm text-green-300 whitespace-pre-wrap bg-gray-900 p-3 rounded-md overflow-auto">
                            {output || "Output will appear here..."}
                        </pre>
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;

