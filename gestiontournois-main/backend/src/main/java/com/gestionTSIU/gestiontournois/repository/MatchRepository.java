package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    // Ici, nous utilisons les méthodes CRUD par défaut fournies par JpaRepository

}
