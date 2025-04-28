package com.gestionTSIU.gestiontournois.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "equipeA_id")
    private Equipe equipeA;

    @ManyToOne
    @JoinColumn(name = "equipeB_id")
    private Equipe equipeB;

    @Temporal(TemporalType.DATE)
    private Date date;

    private Integer scoreA;
    private Integer scoreB;

    @ManyToOne
    @JoinColumn(name = "tournoi_id")
    private Tournament tournoi;

    private String statut;

    // Getters et Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Equipe getEquipeA() {
        return equipeA;
    }

    public void setEquipeA(Equipe equipeA) {
        this.equipeA = equipeA;
    }

    public Equipe getEquipeB() {
        return equipeB;
    }

    public void setEquipeB(Equipe equipeB) {
        this.equipeB = equipeB;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getScoreA() {
        return scoreA;
    }

    public void setScoreA(Integer scoreA) {
        this.scoreA = scoreA;
    }

    public Integer getScoreB() {
        return scoreB;
    }

    public void setScoreB(Integer scoreB) {
        this.scoreB = scoreB;
    }

    public Tournament getTournoi() {
        return tournoi;
    }

    public void setTournoi(Tournament tournoi) {
        this.tournoi = tournoi;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
