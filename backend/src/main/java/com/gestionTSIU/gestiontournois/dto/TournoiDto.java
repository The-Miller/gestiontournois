package com.gestionTSIU.gestiontournois.dto;

public class TournoiDto {

    private Long id;
    private String nomTournoi;
    private String categorie;
    private String date;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomTournoi() { return nomTournoi; }
    public void setNomTournoi(String nomTournoi) { this.nomTournoi = nomTournoi; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
