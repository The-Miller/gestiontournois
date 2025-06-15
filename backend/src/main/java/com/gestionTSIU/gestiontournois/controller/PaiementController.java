package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.model.Paiement;
import com.gestionTSIU.gestiontournois.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiements")
public class PaiementController {

    @Autowired
    private PaiementService paiementService;

    @PostMapping
    public Paiement createPaiement(@RequestBody Paiement paiement) {
        return paiementService.createPaiement(paiement);
    }

    @PutMapping("/{id}/status")
    public Paiement updatePaiementStatus(@PathVariable Long id, @RequestParam String statut) {
        return paiementService.updatePaiementStatus(id, statut);
    }

    @GetMapping("/{reservationId}/qrcode")
    public String generateQRCode(@PathVariable Long reservationId) {
        return paiementService.generateQRCode(reservationId);
    }
}
