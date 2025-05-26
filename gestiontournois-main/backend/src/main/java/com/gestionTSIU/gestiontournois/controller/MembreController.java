package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.model.Membre;
import com.gestionTSIU.gestiontournois.service.MembreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/membres")
public class MembreController {

    @Autowired
    private MembreService membreService;

    @GetMapping("/equipe/{equipeId}")
    public List<Membre> getMembresByEquipe(@PathVariable Long equipeId) {
        return membreService.getMembresByEquipe(equipeId);
    }

    @PostMapping
    public Membre createMembre(@RequestBody Membre membre) {
        return membreService.createMembre(membre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Membre> updateMembre(@PathVariable Long id, @RequestBody Membre membreDetails) {
        Membre updatedMembre = membreService.updateMembre(id, membreDetails);
        if (updatedMembre != null) {
            return ResponseEntity.ok(updatedMembre);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembre(@PathVariable Long id) {
        membreService.deleteMembre(id);
        return ResponseEntity.noContent().build();
    }
}
