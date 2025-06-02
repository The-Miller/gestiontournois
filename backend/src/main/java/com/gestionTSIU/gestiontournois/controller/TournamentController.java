package com.gestionTSIU.gestiontournois.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.gestionTSIU.gestiontournois.model.Tournament;
import com.gestionTSIU.gestiontournois.model.JsonViews;
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

    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        Optional<Tournament> tournament = tournamentService.findById(id);
        return tournament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        try {
            Tournament createdTournament = tournamentService.save(tournament);
            return ResponseEntity.ok(createdTournament);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Tournament(null, null, null, null, null) {{
                        setNom("Erreur : " + e.getMessage());
                    }});
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Long id, @RequestBody Tournament tournamentDetails) {
        try {
            Optional<Tournament> tournamentOptional = tournamentService.findById(id);

            if (!tournamentOptional.isPresent()) {
                System.out.println("Tournoi non trouvé avec l'ID : " + id);
                return ResponseEntity.notFound().build();
            }

            Tournament tournament = tournamentOptional.get();

            tournament.setNom(tournamentDetails.getNom());
            tournament.setCategorie(tournamentDetails.getCategorie());
            tournament.setDate(tournamentDetails.getDate());
            tournament.setStatus(tournamentDetails.getStatus());

            System.out.println("Mise à jour du tournoi : " + tournament.getNom());
            Tournament updatedTournament = tournamentService.save(tournament);
            return ResponseEntity.ok(updatedTournament);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erreur lors de la mise à jour du tournoi ID " + id + " : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Tournament(null, null, null, null, null) {{
                        setNom("Erreur : " + e.getMessage());
                    }});
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        try {
            if (!tournamentService.existsById(id)) {
                System.out.println("Tournoi non trouvé avec l'ID : " + id);
                return ResponseEntity.notFound().build();
            }
            tournamentService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erreur lors de la suppression du tournoi ID " + id + " : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}