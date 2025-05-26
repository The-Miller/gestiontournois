package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Equipe;
import com.gestionTSIU.gestiontournois.model.Membre;
import com.gestionTSIU.gestiontournois.repository.EquipeRepository;
import com.gestionTSIU.gestiontournois.repository.MembreRepository;
import com.gestionTSIU.gestiontournois.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipeService {

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private MembreRepository membreRepository;



    public List<Equipe> getAllEquipes() {
        // Utilisez la méthode findAll modifiée pour récupérer les équipes avec leurs tournois
        return equipeRepository.findAll();
    }

    public Equipe findById(Long id) {
        return equipeRepository.findById(id).orElse(null);  // Rechercher l'équipe par son ID
    }

    public Equipe createEquipe(Equipe equipe) {
        if (equipe.getNom() == null || equipe.getCategorie() == null) {
            throw new IllegalArgumentException("Le nom et la catégorie de l'équipe sont obligatoires.");
        }

        // Vérifiez que le tournoi existe
        if (equipe.getTournoi() == null || !tournamentRepository.existsById(equipe.getTournoi().getId())) {
            throw new IllegalArgumentException("Le tournoi sélectionné est invalide.");
        }

        return equipeRepository.save(equipe);
    }

    public Equipe updateEquipe(Long id, Equipe equipeDetails) {
        // Vérifiez si l'équipe existe dans la base de données
        Equipe existingEquipe = equipeRepository.findById(id).orElse(null);
        if (existingEquipe == null) {
            return null;  // Retourner null si l'équipe n'existe pas
        }

        // Validation des champs
        if (equipeDetails.getNom() == null || equipeDetails.getNom().isEmpty()) {
            throw new IllegalArgumentException("Le nom de l'équipe est obligatoire.");
        }

        if (equipeDetails.getCategorie() == null || equipeDetails.getCategorie().isEmpty()) {
            throw new IllegalArgumentException("La catégorie de l'équipe est obligatoire.");
        }

        if (equipeDetails.getTournoi() == null || !tournamentRepository.existsById(equipeDetails.getTournoi().getId())) {
            throw new IllegalArgumentException("Le tournoi sélectionné est invalide.");
        }

        // Mise à jour des informations de l'équipe
        existingEquipe.setNom(equipeDetails.getNom());
        existingEquipe.setCategorie(equipeDetails.getCategorie());
        existingEquipe.setTournoi(equipeDetails.getTournoi());

        // Sauvegarder les modifications
        return equipeRepository.save(existingEquipe);
    }



    public void deleteEquipe(Long id) {
        equipeRepository.deleteById(id);
    }

    // Method to fetch members by team ID
    public List<Membre> getMembersByTeamId(Long teamId) {
        Equipe equipe = equipeRepository.findById(teamId).orElse(null);
        if (equipe != null) {
            return equipe.getMembres(); // Assuming there's a getMembres() method in Equipe
        }
        return null;
    }

    public Membre addMemberToTeam(Long teamId, Membre membre) {
        Equipe equipe = equipeRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Équipe non trouvée"));
        membre.setEquipe(equipe); // Lier le membre à l'équipe
        return membreRepository.save(membre); // Sauvegarder le membre
    }


    public Membre updateMemberInTeam(Long teamId, Long memberId, Membre membreDetails) {
        Equipe equipe = equipeRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Équipe non trouvée"));
        Membre membre = membreRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Membre non trouvé"));

        membre.setNom(membreDetails.getNom());
        membre.setPrenom(membreDetails.getPrenom());

        return membreRepository.save(membre); // Sauvegarder les modifications
    }

    public void deleteMemberFromTeam(Long teamId, Long memberId) {
        Equipe equipe = equipeRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Équipe non trouvée"));
        Membre membre = membreRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Membre non trouvé"));

        equipe.getMembres().remove(membre);
        membreRepository.delete(membre); // Suppression du membre
    }


}
