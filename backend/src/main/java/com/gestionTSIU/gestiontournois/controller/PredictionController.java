package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.model.Prediction;
import com.gestionTSIU.gestiontournois.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "*")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping
    public ResponseEntity<?> createPrediction(@RequestBody Prediction prediction) {
        if (prediction.getMatchId() == null || prediction.getPredictedTeam() == null) {
            return ResponseEntity.badRequest().body("Match ID et équipe gagnante sont obligatoires.");
        }

        Prediction savedPrediction = predictionService.savePrediction(prediction);
        return ResponseEntity.ok(savedPrediction);
    }

    @GetMapping
    public List<Prediction> getAllPredictions() {
        return predictionService.getAllPredictions();
    }



}
