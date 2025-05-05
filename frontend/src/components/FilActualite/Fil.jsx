import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Fil.css';

const FilActualite = () => {
  return (
    <div className="Fil-actualite-content">
      <Navbar />
      {/* Main Fil d' actualité Section */}
      

      {/* Chat Button */}
      <div className="chat-button">
        <button>Chat</button>
      </div>
    </div>
  );
};

export default FilActualite;