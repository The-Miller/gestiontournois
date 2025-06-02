package com.gestionTSIU.gestiontournois.dto;

public class MembreDto {

    private Long id;
    private String nom;
    private String prenom;
    private String age;
    private String sexe;
    private Long equipeId;  // Identifiant de l'équipe

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getSexe() { return sexe; }
    public void setSexe(String sexe) { this.sexe = sexe; }

    public Long getEquipeId() { return equipeId; }
    public void setEquipeId(Long equipeId) { this.equipeId = equipeId; }
}
