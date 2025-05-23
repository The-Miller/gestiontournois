package com.gestionTSIU.gestiontournois.model;

import jakarta.persistence.*;

@Entity
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matchId;
    private String predictedTeam;
    private String predictedScorer;
    //private String userId;

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public String getPredictedTeam() {
        return predictedTeam;
    }

    public void setPredictedTeam(String predictedTeam) {
        this.predictedTeam = predictedTeam;
    }

    public String getPredictedScorer() {
        return predictedScorer;
    }

    public void setPredictedScorer(String predictedScorer) {
        this.predictedScorer = predictedScorer;
    }

    /*
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

     */
}
