package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Membre;
import com.gestionTSIU.gestiontournois.repository.MembreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembreService {

    @Autowired
    private MembreRepository membreRepository;

    public List<Membre> getMembresByEquipe(Long equipeId) {
        return membreRepository.findByEquipeId(equipeId);
    }

    public Membre createMembre(Membre membre) {
        return membreRepository.save(membre);
    }

    public Membre updateMembre(Long id, Membre membreDetails) {
        Membre existingMembre = membreRepository.findById(id).orElse(null);
        if (existingMembre != null) {
            existingMembre.setNom(membreDetails.getNom());
            existingMembre.setPrenom(membreDetails.getPrenom());
            return membreRepository.save(existingMembre);
        }
        return null;
    }

    public void deleteMembre(Long id) {
        membreRepository.deleteById(id);
    }
}
