package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Utilisateur, Long> {
}
