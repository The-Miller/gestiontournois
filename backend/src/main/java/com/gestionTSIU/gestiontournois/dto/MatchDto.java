package com.gestionTSIU.gestiontournois.dto;

public class MatchDto {

    private Long id;
    private String date;
    private Integer scoreEquipe1;
    private Integer scoreEquipe2;
    private Long tournoiId;  // Identifiant du tournoi
    private Long equipe1Id;  // Identifiant de la première équipe
    private Long equipe2Id;  // Identifiant de la seconde équipe

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Integer getScoreEquipe1() { return scoreEquipe1; }
    public void setScoreEquipe1(Integer scoreEquipe1) { this.scoreEquipe1 = scoreEquipe1; }

    public Integer getScoreEquipe2() { return scoreEquipe2; }
    public void setScoreEquipe2(Integer scoreEquipe2) { this.scoreEquipe2 = scoreEquipe2; }

    public Long getTournoiId() { return tournoiId; }
    public void setTournoiId(Long tournoiId) { this.tournoiId = tournoiId; }

    public Long getEquipe1Id() { return equipe1Id; }
    public void setEquipe1Id(Long equipe1Id) { this.equipe1Id = equipe1Id; }

    public Long getEquipe2Id() { return equipe2Id; }
    public void setEquipe2Id(Long equipe2Id) { this.equipe2Id = equipe2Id; }
}
