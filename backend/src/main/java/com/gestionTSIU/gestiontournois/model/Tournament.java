package com.gestionTSIU.gestiontournois.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tournaments")
@JsonView(JsonViews.TournoiWithEquipes.class)
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonViews.Basic.class)
    private Long id;

    @JsonView(JsonViews.Basic.class)
    private String nom;

    @JsonView(JsonViews.Basic.class)
    private String categorie;

    @JsonView(JsonViews.Basic.class)
    private String date;

    @JsonView(JsonViews.Basic.class)
    private String status;

    @OneToMany(mappedBy = "tournoi", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(JsonViews.TournoiWithEquipes.class)
    @JsonIgnore
    private List<Equipe> equipes = new ArrayList<>();

    // Constructeurs, getters et setters
    public Tournament(Long id, String nom, String categorie, String date, String status) {
        this.id = id;
        this.nom = nom;
        this.categorie = categorie;
        this.date = date;
        this.status = status;
    }

    public Tournament() {
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

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Equipe> getEquipes() {
        return equipes;
    }

    public void setEquipes(List<Equipe> equipes) {
        this.equipes = equipes;
    }
}