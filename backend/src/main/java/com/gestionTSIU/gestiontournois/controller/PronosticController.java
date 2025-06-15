package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.model.Pronostic;
import com.gestionTSIU.gestiontournois.service.PronosticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pronostics")
public class PronosticController {

    @Autowired
    private PronosticService pronosticService;

    @PostMapping
    public Pronostic createPronostic(@RequestBody Pronostic pronostic) {
        return pronosticService.createPronostic(pronostic);
    }

    @GetMapping
    public List<Pronostic> getAllPronostics() {
        return pronosticService.getAllPronostics();
    }

    @GetMapping("/{id}")
    public Pronostic getPronosticById(@PathVariable Long id) {
        return pronosticService.getPronosticById(id);
    }

    @PutMapping("/{id}")
    public Pronostic updatePronostic(@PathVariable Long id, @RequestBody Pronostic pronostic) {
        return pronosticService.updatePronostic(id, pronostic);
    }

    @DeleteMapping("/{id}")
    public void deletePronostic(@PathVariable Long id) {
        pronosticService.deletePronostic(id);
    }
}
