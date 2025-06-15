package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Match;
<<<<<<< HEAD
import com.gestionTSIU.gestiontournois.model.Equipe;
import com.gestionTSIU.gestiontournois.model.Tournament;
import com.gestionTSIU.gestiontournois.dto.MatchDto;
import com.gestionTSIU.gestiontournois.repository.MatchRepository;
import com.gestionTSIU.gestiontournois.repository.EquipeRepository;
import com.gestionTSIU.gestiontournois.repository.TournamentRepository;
=======
import com.gestionTSIU.gestiontournois.repository.MatchRepository;
>>>>>>> sauvegarde-frontend
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

<<<<<<< HEAD
    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

=======
>>>>>>> sauvegarde-frontend
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

<<<<<<< HEAD
    public Match createMatch(MatchDto matchDto) {
        // Vérifier si les IDs sont présents
        if (matchDto.getEquipeaId() == null) {
            throw new IllegalArgumentException("L'ID de l'équipe A est requis");
        }
        if (matchDto.getEquipebId() == null) {
            throw new IllegalArgumentException("L'ID de l'équipe B est requis");
        }
        if (matchDto.getTournoiId() == null) {
            throw new IllegalArgumentException("L'ID du tournoi est requis");
        }

        // Charger les entités
        Equipe equipeA = equipeRepository.findById(matchDto.getEquipeaId())
                .orElseThrow(() -> new RuntimeException("Équipe A non trouvée avec l'ID : " + matchDto.getEquipeaId()));
        Equipe equipeB = equipeRepository.findById(matchDto.getEquipebId())
                .orElseThrow(() -> new RuntimeException("Équipe B non trouvée avec l'ID : " + matchDto.getEquipebId()));
        Tournament tournoi = tournamentRepository.findById(matchDto.getTournoiId())
                .orElseThrow(() -> new RuntimeException("Tournoi non trouvé avec l'ID : " + matchDto.getTournoiId()));

        // Vérifier que les équipes sont différentes
        if (equipeA.getId().equals(equipeB.getId())) {
            throw new IllegalArgumentException("Les deux équipes doivent être différentes.");
        }

        // Créer et remplir l'entité Match
        Match match = new Match();
        match.setEquipeA(equipeA);
        match.setEquipeB(equipeB);
        match.setTournoi(tournoi);
        match.setDate(matchDto.getDate());
        match.setScoreA(matchDto.getScorea() != null ? matchDto.getScorea() : 0);
        match.setScoreB(matchDto.getScoreb() != null ? matchDto.getScoreb() : 0);
        match.setStatut(matchDto.getStatut() != null ? matchDto.getStatut() : "SCHEDULED");
        match.setLieu(matchDto.getLieu());

        // Sauvegarder le match
        return matchRepository.save(match);
    }

    public Match updateMatch(Long id, MatchDto matchDto) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new RuntimeException("Match non trouvé"));

        // Charger les entités si des IDs sont fournis
        if (matchDto.getEquipeaId() != null) {
            Equipe equipeA = equipeRepository.findById(matchDto.getEquipeaId())
                    .orElseThrow(() -> new RuntimeException("Équipe A non trouvée avec l'ID : " + matchDto.getEquipeaId()));
            match.setEquipeA(equipeA);
        }
        if (matchDto.getEquipebId() != null) {
            Equipe equipeB = equipeRepository.findById(matchDto.getEquipebId())
                    .orElseThrow(() -> new RuntimeException("Équipe B non trouvée avec l'ID : " + matchDto.getEquipebId()));
            match.setEquipeB(equipeB);
        }
        if (matchDto.getTournoiId() != null) {
            Tournament tournoi = tournamentRepository.findById(matchDto.getTournoiId())
                    .orElseThrow(() -> new RuntimeException("Tournoi non trouvé avec l'ID : " + matchDto.getTournoiId()));
            match.setTournoi(tournoi);
        }

        // Vérifier que les équipes sont différentes
        if (match.getEquipeA() != null && match.getEquipeB() != null && match.getEquipeA().getId().equals(match.getEquipeB().getId())) {
            throw new IllegalArgumentException("Les deux équipes doivent être différentes.");
        }

        // Mettre à jour les autres champs
        match.setDate(matchDto.getDate());
        match.setScoreA(matchDto.getScorea() != null ? matchDto.getScorea() : match.getScoreA());
        match.setScoreB(matchDto.getScoreb() != null ? matchDto.getScoreb() : match.getScoreB());
        match.setStatut(matchDto.getStatut() != null ? matchDto.getStatut() : match.getStatut());
        match.setLieu(matchDto.getLieu() != null ? matchDto.getLieu() : match.getLieu());

=======
    public Match createMatch(Match match) {
        if (match.getEquipeA().getId().equals(match.getEquipeB().getId())) {
            throw new IllegalArgumentException("Les deux équipes doivent être différentes.");
        }
        return matchRepository.save(match);
    }

    public Match updateMatch(Long id, Match matchDetails) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new RuntimeException("Match non trouvé"));
        if (matchDetails.getEquipeA().getId().equals(matchDetails.getEquipeB().getId())) {
            throw new IllegalArgumentException("Les deux équipes doivent être différentes.");
        }
        match.setEquipeA(matchDetails.getEquipeA());
        match.setEquipeB(matchDetails.getEquipeB());
        match.setScoreA(matchDetails.getScoreA());
        match.setScoreB(matchDetails.getScoreB());
        match.setDate(matchDetails.getDate());
        match.setTournoi(matchDetails.getTournoi());
        match.setStatut(matchDetails.getStatut());
        match.setLieu(matchDetails.getLieu());
>>>>>>> sauvegarde-frontend
        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}