package com.gestionTSIU.gestiontournois.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.util.List;

@Entity
@JsonView(JsonViews.EquipeWithTournoi.class)
public class Equipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonViews.Basic.class)
    private Long id;

    @Column(nullable = false)
    @JsonView(JsonViews.Basic.class)
    private String nom;

    @Column(nullable = false)
    @JsonView(JsonViews.Basic.class)
    private String categorie;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tournoi_id", nullable = false)
    @JsonView(JsonViews.EquipeWithTournoi.class)
    private Tournament tournoi;  // Remplacez Tournoi par Tournament


    @OneToMany(mappedBy = "equipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(JsonViews.EquipeWithTournoi.class)
    @JsonIgnore // Ajoutez cette ligne pour éviter un cycle lors de la sérialisation
    private List<Membre> membres;

    // Constructeurs, getters et setters

    public Equipe() {
    }

    public Equipe(String nom, String categorie, Tournament tournoi) {  // Remplacez Tournoi par Tournament
        this.nom = nom;
        this.categorie = categorie;
        this.tournoi = tournoi;
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

    public Tournament getTournoi() {  // Remplacez Tournoi par Tournament
        return tournoi;
    }

    public void setTournoi(Tournament tournoi) {  // Remplacez Tournoi par Tournament
        this.tournoi = tournoi;
    }

    public List<Membre> getMembres() {
        return membres;
    }

    public void setMembres(List<Membre> membres) {
        this.membres = membres;
    }
}
