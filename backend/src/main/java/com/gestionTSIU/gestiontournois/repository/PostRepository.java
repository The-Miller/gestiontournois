package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Vous pouvez ajouter des méthodes de requête personnalisées ici si nécessaire
}
