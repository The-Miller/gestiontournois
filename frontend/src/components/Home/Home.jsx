import React from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import toornamentLogo from '../../assets/toornament.png';
import homeImage from '../../assets/hame.avif';
import tournamentImage from '../../assets/tourn.png';
import phoneImage from '../../assets/tele.png';
import lamPhoto from '../../assets/lam.jpg';
import niangPhoto from '../../assets/bouba.jpg';

const Home = () => {
  return (
    <div className="home-container">
     <Navbar />

      {/* Section 1 */}
      <div className="content-section">
        <div className="section-row">
          <div className="section-column text-section">
            <img src={toornamentLogo} alt="Toornament Title" className="toornament-title-image" />
            <p className="description">
              Toornament est un outil en ligne conçu pour faciliter l'organisation de tournois universitaires. 
              Il permet de gérer divers aspects d'un tournoi, tels que l'inscription des équipes, la planification des matchs et la saisie des scores. 
              Toornament propose plusieurs formats de tournoi, comme les poules, les phases éliminatoires ou les matchs simples, avec une interface de planification des matchs.
            </p>
          </div>
          <div className="section-column image-section">
            <img src={homeImage} alt="Organisation de tournoi" className="main-illustration" />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="content-section">
        <div className="section-row section-row-reverse">
          <div className="section-column text-section">
            <h2 className="section-title">Votre Tournoi. À votre façon.</h2>
            <p className="description">
              Toornament propose un grand nombre de formats et de paramètres de tournois qui peuvent gérer n'importe quoi, depuis votre partie du vendredi soir jusqu'à une série de tournois en cours ou un tournoi de plusieurs jours avec de nombreux participants.
            </p>
          </div>
          <div className="section-column image-section">
            <img src={phoneImage} alt="Application mobile" className="image" />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="content-section">
        <div className="section-row">
          <div className="section-column text-section">
            <h2 className="section-title">Gérez votre prochain tournoi avec Toornament</h2>
            <p className="description">
              Programmez votre prochain tournoi avec Toornament. <br />
              Planification simple et rapide <br />
              Superbe affichage en direct et en continu <br />
              Page d'inscription en ligne
            </p>
            <a href="/connexion" className="btn btn-cta">Créer un tournoi</a>
          </div>
          <div className="section-column image-section">
            <img src={tournamentImage} alt="Interface Toornament" className="image" />
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <div className="testimonial-section">
        <h2 className="testimonial-title">Ce qu'ils en disent</h2>
        <p className="testimonial-subtitle">Découvrez toutes les raisons qui motivent nos clients à nous recommander</p>
        
        <div className="testimonial-container">
          <div className="testimonial-card">
            <p className="testimonial-text">
              Même une annulation de dernière minute d'une équipe se gère facilement avec Toornament. Investir dans Toornament, c'est moins de stress et plus de souplesse.
            </p>
            <div className="testimonial-info">
              <img src={lamPhoto} alt="Abdou Aziz Lam" className="testimonial-logo" />
              <div>
                <p className="testimonial-author">Abdou Aziz Lam</p>
                <p className="testimonial-role">Planificateur de compétitions à l'IAM</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              Toornament offre un aperçu clair à toutes les personnes présentes sur le site de la compétition. Idéal également pour les organisateurs, car tous les matchs peuvent être planifiés facilement.
            </p>
            <div className="testimonial-info">
              <img src={niangPhoto} alt="Boubacar Niang" className="testimonial-logo" />
              <div>
                <p className="testimonial-author">Boubacar Niang</p>
                <p className="testimonial-role">Membre du comité des tournois Universitaires</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton de chat */}
      <div className="chat-button">
        <button>Chat</button>
      </div>
    </div>
  );
};

export default Home;
