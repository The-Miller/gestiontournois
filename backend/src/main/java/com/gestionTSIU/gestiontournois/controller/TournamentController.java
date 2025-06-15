package com.gestionTSIU.gestiontournois.controller;
<<<<<<< HEAD

import com.fasterxml.jackson.annotation.JsonView;
import com.gestionTSIU.gestiontournois.model.Tournament;
import com.gestionTSIU.gestiontournois.model.JsonViews;
=======
import com.fasterxml.jackson.annotation.JsonView;
import com.gestionTSIU.gestiontournois.model.Equipe;
import com.gestionTSIU.gestiontournois.model.JsonViews;
import com.gestionTSIU.gestiontournois.model.Tournament;
import com.gestionTSIU.gestiontournois.repository.TournamentRepository;
>>>>>>> sauvegarde-frontend
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
<<<<<<< HEAD

=======
    // Récupérer un tournoi par ID
>>>>>>> sauvegarde-frontend
    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        Optional<Tournament> tournament = tournamentService.findById(id);
        return tournament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
<<<<<<< HEAD

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

=======
    // Créer un nouveau tournoi
    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        Tournament createdTournament = tournamentService.save(tournament);
        return ResponseEntity.ok(createdTournament);
    }

    // Mettre à jour un tournoi
>>>>>>> sauvegarde-frontend
    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable Long id, @RequestBody Tournament tournamentDetails) {
        try {
            Optional<Tournament> tournamentOptional = tournamentService.findById(id);

            if (!tournamentOptional.isPresent()) {
<<<<<<< HEAD
                System.out.println("Tournoi non trouvé avec l'ID : " + id);
=======
>>>>>>> sauvegarde-frontend
                return ResponseEntity.notFound().build();
            }

            Tournament tournament = tournamentOptional.get();

<<<<<<< HEAD
            tournament.setNom(tournamentDetails.getNom());
            tournament.setCategorie(tournamentDetails.getCategorie());
            tournament.setDate(tournamentDetails.getDate());
            tournament.setStatus(tournamentDetails.getStatus());

            System.out.println("Mise à jour du tournoi : " + tournament.getNom());
=======
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

>>>>>>> sauvegarde-frontend
            Tournament updatedTournament = tournamentService.save(tournament);
            return ResponseEntity.ok(updatedTournament);
        } catch (Exception e) {
            e.printStackTrace();
<<<<<<< HEAD
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
=======
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
>>>>>>> sauvegarde-frontend
