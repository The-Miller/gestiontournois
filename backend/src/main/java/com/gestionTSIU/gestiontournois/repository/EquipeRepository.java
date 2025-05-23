package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Equipe;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Long> {

    // Utilisation d'EntityGraph pour charger le tournoi associé à chaque équipe
    @EntityGraph(attributePaths = {"tournoi"})
    List<Equipe> findAll();
}
