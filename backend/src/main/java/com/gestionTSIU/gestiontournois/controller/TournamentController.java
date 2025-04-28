package com.gestionTSIU.gestiontournois.controller;
import com.fasterxml.jackson.annotation.JsonView;
import com.gestionTSIU.gestiontournois.model.Equipe;
import com.gestionTSIU.gestiontournois.model.JsonViews;
import com.gestionTSIU.gestiontournois.model.Tournament;
import com.gestionTSIU.gestiontournois.repository.TournamentRepository;
import com.gestionTSIU.gestiontournois.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    @GetMapping
    @JsonView(JsonViews.TournoiWithEquipes.class)
    public List<Tournament> getAllTournaments() {
        return tournamentService.findAll();
    }
    // Récupérer un tournoi par ID
    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        Optional<Tournament> tournament = tournamentService.findById(id);
        return tournament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // Créer un nouveau tournoi
    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        Tournament createdTournament = tournamentService.save(tournament);
        return ResponseEntity.ok(createdTournament);
    }

    // Mettre à jour un tournoi
    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Long id, @RequestBody Tournament tournamentDetails) {
        try {
            Optional<Tournament> tournamentOptional = tournamentService.findById(id);

            if (!tournamentOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Tournament tournament = tournamentOptional.get();

            // Mettre à jour les attributs principaux du tournoi
            tournament.setNom(tournamentDetails.getNom());
            tournament.setCategorie(tournamentDetails.getCategorie());
            tournament.setDate(tournamentDetails.getDate());

            // Vérifiez que la liste d'équipes n'est pas null avant de l'utiliser
            if (tournamentDetails.getEquipes() != null) {
                tournament.getEquipes().clear();

                for (Equipe equipe : tournamentDetails.getEquipes()) {
                    equipe.setTournoi(tournament);
                    tournament.getEquipes().add(equipe);
                }
            }

            Tournament updatedTournament = tournamentService.save(tournament);
            return ResponseEntity.ok(updatedTournament);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Supprimer un tournoi
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        if (!tournamentService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        tournamentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
