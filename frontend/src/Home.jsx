import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the custom CSS for the dreamy effect

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCollaborating = () => {
    setIsLoading(true);
    const randomRoomId = Math.random().toString(36).substr(2, 8);
    setTimeout(() => {
      navigate(`/${randomRoomId}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Floating 3D shapes */}
      <div className="drawing drawing-1"></div>
      <div className="drawing drawing-2"></div>
      <div className="drawing drawing-3"></div>

      {/* Main content box */}
      <div className="relative p-8 max-w-md mx-auto text-center bg-white bg-opacity-50 rounded-lg shadow-lg backdrop-blur-lg glass-box">
        <h1 className="text-6xl font-extrabold mb-6 text-gray-50 tracking-wide glow-text">
          Welcome to CoCode
        </h1>
        <p className="text-2xl text-gray-200 mb-8">
          Collaborate with others in real-time on code. Create a new room or join an existing one.
        </p>
        <button
          onClick={handleStartCollaborating}
          className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform glow-button ${isLoading ? 'opacity-50' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Room...' : 'Start Collaborating'}
        </button>
      </div>

      {/* Dreamy Text Boxes */}
      <div className="info-box absolute" style={{ top: '3%', left: '5%' }}>
        <h2 className="text-xl font-bold mb-2">Real-Time Collaboration</h2>
        <p>Join others and edit code together in real-time.</p>
      </div>

      <div className="info-box absolute" style={{ top: '12%', right: '5%' }}>
        <h2 className="text-xl font-bold mb-2">Create Your Room</h2>
        <p>Start a room and invite your team with a single click.</p>
      </div>

      <div className="info-box absolute" style={{ bottom: '10%', right: '5%' }}>
        <h2 className="text-xl font-bold mb-2">No Setup Needed</h2>
        <p>Get started immediately, no installation required.</p>
      </div>
    </div>
  );
};

export default Home;
