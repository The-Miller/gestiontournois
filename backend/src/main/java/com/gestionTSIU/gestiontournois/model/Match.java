// package com.gestionTSIU.gestiontournois.model;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "matches")
// public class Match {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "equipeA_id")
//     private Equipe equipeA;

//     @ManyToOne
//     @JoinColumn(name = "equipeB_id")
//     private Equipe equipeB;

//     @Column
//     private LocalDateTime date;

//     @Column
//     private Integer scoreA;

//     @Column
//     private Integer scoreB;

//     @ManyToOne
//     @JoinColumn(name = "tournoi_id")
//     private Tournament tournoi;

//     @Column
//     private String statut;

//     @Column
//     private String lieu;
    

//     // Getters et Setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public Equipe getEquipeA() {
//         return equipeA;
//     }

//     public void setEquipeA(Equipe equipeA) {
//         this.equipeA = equipeA;
//     }

//     public Equipe getEquipeB() {
//         return equipeB;
//     }

//     public void setEquipeB(Equipe equipeB) {
//         this.equipeB = equipeB;
//     }

//     public LocalDateTime getDate() {
//         return date;
//     }

//     public void setDate(LocalDateTime date) {
//         this.date = date;
//     }

//     public Integer getScoreA() {
//         return scoreA;
//     }

//     public void setScoreA(Integer scoreA) {
//         this.scoreA = scoreA;
//     }

//     public Integer getScoreB() {
//         return scoreB;
//     }

//     public void setScoreB(Integer scoreB) {
//         this.scoreB = scoreB;
//     }

//     public Tournament getTournoi() {
//         return tournoi;
//     }

//     public void setTournoi(Tournament tournoi) {
//         this.tournoi = tournoi;
//     }

//     public String getStatut() {
//         return statut;
//     }

//     public void setStatut(String statut) {
//         this.statut = statut;
//     }

//     public String getLieu() {
//         return lieu;
//     }

//     public void setLieu(String lieu) {
//         this.lieu = lieu;
//     }
// }
package com.gestionTSIU.gestiontournois.model;

import jakarta.persistence.*;
<<<<<<< HEAD

import java.time.LocalDate;
=======
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
>>>>>>> sauvegarde-frontend

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
<<<<<<< HEAD
    @JoinColumn(name = "equipeA_id") // Assure-toi que le nom de la colonne correspond à la base de données
    private Equipe equipeA;

    @ManyToOne
    @JoinColumn(name = "equipeB_id") // Assure-toi que le nom de la colonne correspond à la base de données
    private Equipe equipeB;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "scoreA")
    private Integer scoreA;

    @Column(name = "scoreB")
=======
    @JoinColumn(name = "equipeA_id")
    private Equipe equipeA;

    @ManyToOne
    @JoinColumn(name = "equipeB_id")
    private Equipe equipeB;

    @Column
    private LocalDateTime date;

    @Column
    private Integer scoreA;

    @Column
>>>>>>> sauvegarde-frontend
    private Integer scoreB;

    @ManyToOne
    @JoinColumn(name = "tournoi_id")
    private Tournament tournoi;

<<<<<<< HEAD
    @Column(name = "statut")
    private String statut;

    @Column(name = "lieu")
=======
    @Column
    private String statut;

    @Column
    @JsonProperty("lieu") // Ajouté pour s'assurer que le champ est inclus
>>>>>>> sauvegarde-frontend
    private String lieu;

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

<<<<<<< HEAD
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
=======
    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
>>>>>>> sauvegarde-frontend
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

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }
}