// src/components/Contact/Contact.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toornament from '../../assets/toornament.png';
import background from '../../assets/football.webp';
import './contact.css';
import Navbar from '../Navbar/Navbar';

// Définition des icônes SVG
const MapIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
  </svg>
);

const EnvelopeIcon = () => (
  <svg className="contact-icon" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    console.log('Données du formulaire:', formData);
    
    setIsSubmitted(true);
    setError('');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* Navbar Fixe */}
      <Navbar />

      {/* Section Contact */}
      <div className="contact-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="contact-overlay"></div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contactez-nous</h2>
            <p>Une question, une suggestion ? Notre équipe est à votre écoute.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <MapIcon />
                <div>
                  <h4>Adresse</h4>
                  <p>123 Rue du Sport, 75000 Paris</p>
                </div>
              </div>
              
              <div className="contact-item">
                <PhoneIcon />
                <div>
                  <h4>Téléphone</h4>
                  <p>+33 1 23 45 67 89</p>
                </div>
              </div>
              
              <div className="contact-item">
                <EnvelopeIcon />
                <div>
                  <h4>Email</h4>
                  <p>contact@toornament.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <h3>Merci pour votre message !</h3>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-login"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Envoyez-nous un message</h3>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Objet de votre message"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;