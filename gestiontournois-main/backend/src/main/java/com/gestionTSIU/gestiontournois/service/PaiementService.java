package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Paiement;
import com.gestionTSIU.gestiontournois.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaiementService {

    @Autowired
    private PaiementRepository paiementRepository;

    public Paiement createPaiement(Paiement paiement) {
        paiement.setStatut("EN_ATTENTE");
        return paiementRepository.save(paiement);
    }

    public Paiement updatePaiementStatus(Long id, String statut) {
        Paiement paiement = paiementRepository.findById(id).orElse(null);
        if (paiement != null) {
            paiement.setStatut(statut);
            return paiementRepository.save(paiement);
        }
        return null;
    }

    public String generateQRCode(Long reservationId) {
        return UUID.randomUUID().toString(); // Utiliser une bibliothèque de génération de QR Code pour créer un QR Code réel
    }
}
