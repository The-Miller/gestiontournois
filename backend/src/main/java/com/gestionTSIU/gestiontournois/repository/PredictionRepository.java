package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {
}