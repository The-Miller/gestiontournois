package com.gestionTSIU.gestiontournois.dto;

public class PronosticDto {

    private Long id;
    private Long utilisateurId;
    private Long matchId;
    private Integer scorePrevuEquipe1;
    private Integer scorePrevuEquipe2;
    private Boolean resultatCorrect;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(Long utilisateurId) { this.utilisateurId = utilisateurId; }

    public Long getMatchId() { return matchId; }
    public void setMatchId(Long matchId) { this.matchId = matchId; }

    public Integer getScorePrevuEquipe1() { return scorePrevuEquipe1; }
    public void setScorePrevuEquipe1(Integer scorePrevuEquipe1) { this.scorePrevuEquipe1 = scorePrevuEquipe1; }

    public Integer getScorePrevuEquipe2() { return scorePrevuEquipe2; }
    public void setScorePrevuEquipe2(Integer scorePrevuEquipe2) { this.scorePrevuEquipe2 = scorePrevuEquipe2; }

    public Boolean getResultatCorrect() { return resultatCorrect; }
    public void setResultatCorrect(Boolean resultatCorrect) { this.resultatCorrect = resultatCorrect; }
}
