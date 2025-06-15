package com.gestionTSIU.gestiontournois.controller;

<<<<<<< HEAD
import com.gestionTSIU.gestiontournois.dto.MatchDto;
=======
>>>>>>> sauvegarde-frontend
import com.gestionTSIU.gestiontournois.model.Match;
import com.gestionTSIU.gestiontournois.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
<<<<<<< HEAD
@CrossOrigin(origins = "http://localhost:5173")
=======
@CrossOrigin(origins = "http://localhost:5173") // Autoriser les requêtes CORS depuis l'application Angular
>>>>>>> sauvegarde-frontend
public class MatchController {

    @Autowired
    private MatchService matchService;

<<<<<<< HEAD
=======
    // Récupérer tous les matchs
>>>>>>> sauvegarde-frontend
    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

<<<<<<< HEAD
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Optional<Match> match = matchService.getMatchById(id);
        return match.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody MatchDto matchDto) {
        try {
            Match newMatch = matchService.createMatch(matchDto);
            return ResponseEntity.ok(newMatch);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @RequestBody MatchDto matchDto) {
        try {
            Match updatedMatch = matchService.updateMatch(id, matchDto);
            return ResponseEntity.ok(updatedMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

=======
    // Récupérer un match par ID
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Optional<Match> match = matchService.getMatchById(id);
        if (match.isPresent()) {
            return ResponseEntity.ok(match.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Créer un nouveau match
    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        Match newMatch = matchService.createMatch(match);
        return ResponseEntity.ok(newMatch);
    }

    // Mettre à jour un match existant
    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @RequestBody Match matchDetails) {
        Match updatedMatch = matchService.updateMatch(id, matchDetails);
        return ResponseEntity.ok(updatedMatch);
    }

    // Supprimer un match
>>>>>>> sauvegarde-frontend
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> sauvegarde-frontend
