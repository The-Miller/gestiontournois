package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Pronostic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PronosticRepository extends JpaRepository<Pronostic, Long> {
}
