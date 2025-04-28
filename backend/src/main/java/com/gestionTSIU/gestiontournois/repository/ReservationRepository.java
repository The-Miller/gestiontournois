package com.gestionTSIU.gestiontournois.repository;

import com.gestionTSIU.gestiontournois.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
