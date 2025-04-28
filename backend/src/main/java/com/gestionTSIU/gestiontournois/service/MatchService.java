package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Match;
import com.gestionTSIU.gestiontournois.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match updateMatch(Long id, Match matchDetails) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new RuntimeException("Match non trouvé"));
        match.setEquipeA(matchDetails.getEquipeA());
        match.setEquipeB(matchDetails.getEquipeB());
        match.setScoreA(matchDetails.getScoreA());
        match.setScoreB(matchDetails.getScoreB());
        match.setDate(matchDetails.getDate());
        match.setTournoi(matchDetails.getTournoi());
        match.setStatut(matchDetails.getStatut());
        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}
