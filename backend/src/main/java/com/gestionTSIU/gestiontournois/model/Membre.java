package com.gestionTSIU.gestiontournois.model;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

@Entity
public class Membre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonViews.Basic.class)
    private Long id;

    @Column(nullable = false)
    @JsonView(JsonViews.Basic.class)
    private String nom;

    @Column(nullable = false)
    @JsonView(JsonViews.Basic.class)
    private String prenom;

    @ManyToOne
    @JoinColumn(name = "equipe_id", nullable = false)
    @JsonView(JsonViews.MembreWithEquipe.class)
    private Equipe equipe;

    // Constructeurs, getters et setters

    public Membre() {
    }

    public Membre(String nom, String prenom, Equipe equipe) {
        this.nom = nom;
        this.prenom = prenom;
        this.equipe = equipe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Equipe getEquipe() {
        return equipe;
    }

    public void setEquipe(Equipe equipe) {
        this.equipe = equipe;
    }
}
