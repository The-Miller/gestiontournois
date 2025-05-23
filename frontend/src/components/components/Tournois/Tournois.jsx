import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Tournois.css';

const Tournois = () => {
  return (
    <div className="tournois-content">
      <Navbar />
      {/* Main Tournois Section */}
      

      {/* Chat Button */}
      <div className="chat-button">
        <button>Chat</button>
      </div>
    </div>
  );
};

export default Tournois;