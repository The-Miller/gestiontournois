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

<<<<<<< HEAD
    @JsonView(JsonViews.Basic.class)
    private String status;

=======
>>>>>>> sauvegarde-frontend
    @OneToMany(mappedBy = "tournoi", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(JsonViews.TournoiWithEquipes.class)
    @JsonIgnore
    private List<Equipe> equipes = new ArrayList<>();

<<<<<<< HEAD
    // Constructeurs, getters et setters
    public Tournament(Long id, String nom, String categorie, String date, String status) {
=======


    // Constructeurs, getters et setters

    public Tournament(Long id, String nom, String categorie, String date) {
>>>>>>> sauvegarde-frontend
        this.id = id;
        this.nom = nom;
        this.categorie = categorie;
        this.date = date;
<<<<<<< HEAD
        this.status = status;
=======
>>>>>>> sauvegarde-frontend
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

<<<<<<< HEAD
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

=======
>>>>>>> sauvegarde-frontend
    public List<Equipe> getEquipes() {
        return equipes;
    }

    public void setEquipes(List<Equipe> equipes) {
        this.equipes = equipes;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> sauvegarde-frontend
