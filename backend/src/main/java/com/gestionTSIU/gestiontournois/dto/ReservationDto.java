package com.gestionTSIU.gestiontournois.dto;

public class ReservationDto {

    private Long id;
    private Long tournoiId; // Identifiant du tournoi
    private String email;
    private String codeQR;
    private Boolean paye;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTournoiId() { return tournoiId; }
    public void setTournoiId(Long tournoiId) { this.tournoiId = tournoiId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCodeQR() { return codeQR; }
    public void setCodeQR(String codeQR) { this.codeQR = codeQR; }

    public Boolean getPaye() { return paye; }
    public void setPaye(Boolean paye) { this.paye = paye; }
}
