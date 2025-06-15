package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {
}
