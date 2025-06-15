package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Pronostic;
import com.gestionTSIU.gestiontournois.repository.PronosticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PronosticService {

    @Autowired
    private PronosticRepository pronosticRepository;

    public Pronostic createPronostic(Pronostic pronostic) {
        return pronosticRepository.save(pronostic);
    }

    public List<Pronostic> getAllPronostics() {
        return pronosticRepository.findAll();
    }

    public Pronostic getPronosticById(Long id) {
        return pronosticRepository.findById(id).orElse(null);
    }

    public Pronostic updatePronostic(Long id, Pronostic pronostic) {
        Pronostic existingPronostic = pronosticRepository.findById(id).orElse(null);
        if (existingPronostic != null) {
            existingPronostic.setScorePrevuEquipe1(pronostic.getScorePrevuEquipe1());
            existingPronostic.setScorePrevuEquipe2(pronostic.getScorePrevuEquipe2());
            existingPronostic.setResultatCorrect(pronostic.getResultatCorrect());
            return pronosticRepository.save(existingPronostic);
        }
        return null;
    }

    public void deletePronostic(Long id) {
        pronosticRepository.deleteById(id);
    }
}
