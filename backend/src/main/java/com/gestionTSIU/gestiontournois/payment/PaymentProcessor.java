package com.gestionTSIU.gestiontournois.payment;

import com.gestionTSIU.gestiontournois.model.Paiement;
import com.gestionTSIU.gestiontournois.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentProcessor {

    @Autowired
    private PaiementRepository paiementRepository;

    public Paiement processPayment(Paiement paiement) {
        // Logique pour traiter le paiement (par exemple, intégrer Stripe, PayPal, etc.)
        paiement.setStatut("PAYER");
        return paiementRepository.save(paiement);
    }

    public Paiement refundPayment(Long paiementId) {
        Paiement paiement = paiementRepository.findById(paiementId).orElse(null);
        if (paiement != null && paiement.getStatut().equals("PAYER")) {
            // Logique de remboursement
            paiement.setStatut("REMBOURSÉ");
            return paiementRepository.save(paiement);
        }
        return null;
    }
}
