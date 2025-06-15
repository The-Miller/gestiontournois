package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    ChatSession findBySessionId(String sessionId);
}
