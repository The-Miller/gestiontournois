import React from 'react';
import { X } from 'lucide-react';

const TournamentModal = ({ isOpen, onClose, onSubmit, newTournament, setNewTournament, editingId, communityManagers }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="tournament-modal">
        <div className="modal-header">
          <h3 className="modal-title">{editingId ? 'Modifier le tournoi' : 'Ajouter un nouveau tournoi'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="tournament-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nom">Nom du tournoi</label>
              <input
                id="nom"
                type="text"
                value={newTournament.nom}
                onChange={(e) => setNewTournament({ ...newTournament, nom: e.target.value })}
                required
                placeholder="Entrez le nom du tournoi"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={newTournament.date}
                onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categorie">Catégorie</label>
              <select
                id="categorie"
                value={newTournament.categorie}
                onChange={(e) => setNewTournament({ ...newTournament, categorie: e.target.value })}
                required
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Handball">Handball</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                value={newTournament.status}
                onChange={(e) => setNewTournament({ ...newTournament, status: e.target.value })}
                required
              >
                <option value="UPCOMING">À venir</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="COMPLETED">Terminé</option>
              </select>
            </div>
            {/* Section Community Manager */}
            <div className="form-group">
              <label htmlFor="createCommunityManager">
                <input
                  id="createCommunityManager"
                  type="checkbox"
                  checked={newTournament.createCommunityManager}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, createCommunityManager: e.target.checked })
                  }
                  disabled={editingId} // Désactiver lors de l'édition
                />
                Créer un nouveau Community Manager
              </label>
            </div>
            {newTournament.createCommunityManager && !editingId ? (
              <>
                <div className="form-group">
                  <label htmlFor="cmNom">Nom du Community Manager</label>
                  <input
                    id="cmNom"
                    type="text"
                    value={newTournament.communityManager?.nom || ''}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        communityManager: { ...newTournament.communityManager, nom: e.target.value }
                      })
                    }
                    required
                    placeholder="Entrez le nom"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cmPrenom">Prénom du Community Manager</label>
                  <input
                    id="cmPrenom"
                    type="text"
                    value={newTournament.communityManager?.prenom || ''}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        communityManager: { ...newTournament.communityManager, prenom: e.target.value }
                      })
                    }
                    required
                    placeholder="Entrez le prénom"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cmEmail">Email du Community Manager</label>
                  <input
                    id="cmEmail"
                    type="email"
                    value={newTournament.communityManager?.email || ''}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        communityManager: { ...newTournament.communityManager, email: e.target.value }
                      })
                    }
                    required
                    placeholder="Entrez l'email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cmPassword">Mot de passe du Community Manager</label>
                  <input
                    id="cmPassword"
                    type="password"
                    value={newTournament.communityManager?.password || ''}
                    onChange={(e) =>
                      setNewTournament({
                        ...newTournament,
                        communityManager: { ...newTournament.communityManager, password: e.target.value }
                      })
                    }
                    required
                    placeholder="Entrez le mot de passe"
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="communityManagerId">Community Manager</label>
                <select
                  id="communityManagerId"
                  value={newTournament.communityManagerId || ''}
                  onChange={(e) =>
                    setNewTournament({ ...newTournament, communityManagerId: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Sélectionnez un Community Manager
                  </option>
                  {communityManagers.map((cm) => (
                    <option key={cm.id} value={cm.id}>
                      {cm.nom} {cm.prenom} ({cm.email})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="submit-button">
              {editingId ? 'Mettre à jour' : 'Créer Tournoi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentModal;