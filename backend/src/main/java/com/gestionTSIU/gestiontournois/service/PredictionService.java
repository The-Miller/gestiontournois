package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Prediction;
import com.gestionTSIU.gestiontournois.repository.PredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredictionService {

    @Autowired
    private PredictionRepository predictionRepository;

    public Prediction savePrediction(Prediction prediction) {
        return predictionRepository.save(prediction);
    }

    public List<Prediction> getAllPredictions() {
        return predictionRepository.findAll();
    }

}