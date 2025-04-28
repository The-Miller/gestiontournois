package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.model.Match;
import com.gestionTSIU.gestiontournois.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:4200") // Autoriser les requêtes CORS depuis l'application Angular
public class MatchController {

    @Autowired
    private MatchService matchService;

    // Récupérer tous les matchs
    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
}
