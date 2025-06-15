package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
=======
>>>>>>> sauvegarde-frontend
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    // Ici, nous utilisons les méthodes CRUD par défaut fournies par JpaRepository
<<<<<<< HEAD
@Modifying
@Query("DELETE FROM Match m WHERE m.equipeA.id = :equipeId1 OR m.equipeB.id = :equipeId2")
void deleteByEquipeAIdOrEquipeBId(@Param("equipeId1") Long equipeId1, @Param("equipeId2") Long equipeId2);
=======
>>>>>>> sauvegarde-frontend

}
