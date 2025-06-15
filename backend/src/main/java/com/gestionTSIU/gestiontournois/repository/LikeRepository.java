package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
}
