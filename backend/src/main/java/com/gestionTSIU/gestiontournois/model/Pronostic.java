package com.gestionTSIU.gestiontournois.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pronostics")
public class Pronostic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;
    private Integer scorePrevuEquipe1;
    private Integer scorePrevuEquipe2;
    private Boolean resultatCorrect;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Integer getScorePrevuEquipe1() {
        return scorePrevuEquipe1;
    }

    public void setScorePrevuEquipe1(Integer scorePrevuEquipe1) {
        this.scorePrevuEquipe1 = scorePrevuEquipe1;
    }

    public Integer getScorePrevuEquipe2() {
        return scorePrevuEquipe2;
    }

    public void setScorePrevuEquipe2(Integer scorePrevuEquipe2) {
        this.scorePrevuEquipe2 = scorePrevuEquipe2;
    }

    public Boolean getResultatCorrect() {
        return resultatCorrect;
    }

    public void setResultatCorrect(Boolean resultatCorrect) {
        this.resultatCorrect = resultatCorrect;
    }
}
