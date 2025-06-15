package com.gestionTSIU.gestiontournois.model;

import jakarta.persistence.*;


@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "tournoi_id")
    private Tournament tournoi;
    private String email;
    private String codeQR;
    private Boolean paye;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tournament getTournoi() {
        return tournoi;
    }

    public void setTournoi(Tournament tournoi) {
        this.tournoi = tournoi;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCodeQR() {
        return codeQR;
    }

    public void setCodeQR(String codeQR) {
        this.codeQR = codeQR;
    }

    public Boolean getPaye() {
        return paye;
    }

    public void setPaye(Boolean paye) {
        this.paye = paye;
    }
}
