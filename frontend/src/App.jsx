// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CodeEditor from './CodeEditor';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<CodeEditor />} /> {/* Fallback route */}
    </Routes>
  </Router>
);

export default App;
