import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import { FiMenu } from 'react-icons/fi';
import './App.css';

const socket = io('https://cocode-9zbp.onrender.com');

function CodeEditor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const roomIdFromUrl = pathSegments[1] || 'default-room';
    
    setRoomId(roomIdFromUrl);
  
    socket.emit('joinRoom', { roomId: roomIdFromUrl });
  
    socket.on('codeChange', (updatedCode) => {
      setCode(updatedCode);
    });
  
    return () => {
      socket.off('codeChange');
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', { roomId });

      socket.on('codeChange', (updatedCode) => {
        setCode(updatedCode);
      });

      return () => {
        socket.off('codeChange');
      };
    }
  }, [roomId]);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('codeChange', { roomId, code: value });
  };

  return (
    <div className="h-screen relative flex flex-col overflow-hidden bg-gradient-to-r">
      <header className="shadow-md p-4 text-white flex justify-between items-center h-14 border-b border-gray-800 z-20">
        <button
          className="block lg:hidden glow-button text-white text-3xl ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
        <h1 className="text-xl font-bold ml-4">CoCode</h1> {/* Left-aligned */}
        <div className="hidden lg:flex space-x-4 mr-4">
          <select
            className="glow-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <select
            className="glow-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast Black</option>
          </select>
        </div>
      </header>

      <nav
        className={`fixed top-0 right-0 h-full bg-gray-900 bg-opacity-90 backdrop-blur-lg p-6 transition-transform transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden z-20`}
      >
        <ul className="space-y-6 text-lg">
          <li>
            <button
              className="glow-button"
              onClick={() => setMenuOpen(false)}
            >
              Close Menu
            </button>
          </li>
          <li>
            <select
              className="glow-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
          </li>
          <li>
            <select
              className="glow-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast Black</option>
            </select>
          </li>
        </ul>
      </nav>

      <div className="flex-grow relative z-10 p-1.5 border-8 border-t-0 border-transparent bg-gradient-to-r">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            lineHeight: 24,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
