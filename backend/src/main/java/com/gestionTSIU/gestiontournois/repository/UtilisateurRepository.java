package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByEmail(String email);
    boolean existsByEmail(String email);
}
