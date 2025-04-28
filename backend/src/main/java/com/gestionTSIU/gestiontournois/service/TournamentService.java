package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.exception.ResourceNotFoundException;
import com.gestionTSIU.gestiontournois.model.Equipe;
import com.gestionTSIU.gestiontournois.model.Tournament;
import com.gestionTSIU.gestiontournois.repository.TournamentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    public List<Tournament> findAll() {
        return tournamentRepository.findAll();
    }

    public Optional<Tournament> findById(Long id) {
        return tournamentRepository.findById(id);
    }

    public Tournament save(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public void deleteById(Long id) {
        tournamentRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return tournamentRepository.existsById(id);
    }

    @Transactional
    public Tournament updateTournament(Long id, Tournament tournamentDetails) {
        Optional<Tournament> optionalTournament = tournamentRepository.findById(id);

        if (optionalTournament.isEmpty()) {
            throw new ResourceNotFoundException("Tournoi non trouvé pour cet ID :: " + id);
        }

        Tournament tournament = optionalTournament.get();

        // Mettre à jour les attributs du tournoi
        tournament.setNom(tournamentDetails.getNom());
        tournament.setCategorie(tournamentDetails.getCategorie());
        tournament.setDate(tournamentDetails.getDate());

        // Gérer les équipes associées
        tournament.getEquipes().clear();
        for (Equipe equipe : tournamentDetails.getEquipes()) {
            equipe.setTournoi(tournament); // Réassigner la relation parent
            tournament.getEquipes().add(equipe);
        }

        return tournamentRepository.save(tournament);
    }
}
