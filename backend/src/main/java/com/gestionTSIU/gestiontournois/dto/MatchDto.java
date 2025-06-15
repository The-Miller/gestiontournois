<<<<<<< HEAD
// package com.gestionTSIU.gestiontournois.dto;

// public class MatchDto {

//     private Long id;
//     private String date;
//     private Integer scoreEquipe1;
//     private Integer scoreEquipe2;
//     private Long tournoiId;  // Identifiant du tournoi
//     private Long equipe1Id;  // Identifiant de la première équipe
//     private Long equipe2Id;  // Identifiant de la seconde équipe

//     // Getters et Setters
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getDate() { return date; }
//     public void setDate(String date) { this.date = date; }

//     public Integer getScoreEquipe1() { return scoreEquipe1; }
//     public void setScoreEquipe1(Integer scoreEquipe1) { this.scoreEquipe1 = scoreEquipe1; }

//     public Integer getScoreEquipe2() { return scoreEquipe2; }
//     public void setScoreEquipe2(Integer scoreEquipe2) { this.scoreEquipe2 = scoreEquipe2; }

//     public Long getTournoiId() { return tournoiId; }
//     public void setTournoiId(Long tournoiId) { this.tournoiId = tournoiId; }

//     public Long getEquipe1Id() { return equipe1Id; }
//     public void setEquipe1Id(Long equipe1Id) { this.equipe1Id = equipe1Id; }

//     public Long getEquipe2Id() { return equipe2Id; }
//     public void setEquipe2Id(Long equipe2Id) { this.equipe2Id = equipe2Id; }
// }

package com.gestionTSIU.gestiontournois.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public class MatchDto {

    private Long id;
    @JsonProperty("tournoi_id")
    private Long tournoiId;
    @JsonProperty("equipea_id")
    private Long equipeaId;
    @JsonProperty("equipeb_id")
    private Long equipebId;
    private LocalDate date;
    @JsonProperty("scorea")
    private Integer scorea;
    @JsonProperty("scoreb")
    private Integer scoreb;
    private String statut;
    private String lieu;
=======
package com.gestionTSIU.gestiontournois.dto;

public class MatchDto {

    private Long id;
    private String date;
    private Integer scoreEquipe1;
    private Integer scoreEquipe2;
    private Long tournoiId;  // Identifiant du tournoi
    private Long equipe1Id;  // Identifiant de la première équipe
    private Long equipe2Id;  // Identifiant de la seconde équipe
>>>>>>> sauvegarde-frontend

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

<<<<<<< HEAD
    public Long getTournoiId() { return tournoiId; }
    public void setTournoiId(Long tournoiId) { this.tournoiId = tournoiId; }

    public Long getEquipeaId() { return equipeaId; }
    public void setEquipeaId(Long equipeaId) { this.equipeaId = equipeaId; }

    public Long getEquipebId() { return equipebId; }
    public void setEquipebId(Long equipebId) { this.equipebId = equipebId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Integer getScorea() { return scorea; }
    public void setScorea(Integer scorea) { this.scorea = scorea; }

    public Integer getScoreb() { return scoreb; }
    public void setScoreb(Integer scoreb) { this.scoreb = scoreb; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public String getLieu() { return lieu; }
    public void setLieu(String lieu) { this.lieu = lieu; }
}
=======
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Integer getScoreEquipe1() { return scoreEquipe1; }
    public void setScoreEquipe1(Integer scoreEquipe1) { this.scoreEquipe1 = scoreEquipe1; }

    public Integer getScoreEquipe2() { return scoreEquipe2; }
    public void setScoreEquipe2(Integer scoreEquipe2) { this.scoreEquipe2 = scoreEquipe2; }

    public Long getTournoiId() { return tournoiId; }
    public void setTournoiId(Long tournoiId) { this.tournoiId = tournoiId; }

    public Long getEquipe1Id() { return equipe1Id; }
    public void setEquipe1Id(Long equipe1Id) { this.equipe1Id = equipe1Id; }

    public Long getEquipe2Id() { return equipe2Id; }
    public void setEquipe2Id(Long equipe2Id) { this.equipe2Id = equipe2Id; }
}
>>>>>>> sauvegarde-frontend
