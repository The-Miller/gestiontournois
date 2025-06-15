package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Reservation;
import com.gestionTSIU.gestiontournois.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public Reservation updateReservation(Long id, Reservation reservation) {
        Reservation existingReservation = reservationRepository.findById(id).orElse(null);
        if (existingReservation != null) {
            existingReservation.setEmail(reservation.getEmail());
            existingReservation.setCodeQR(reservation.getCodeQR());
            existingReservation.setPaye(reservation.getPaye());
            return reservationRepository.save(existingReservation);
        }
        return null;
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
