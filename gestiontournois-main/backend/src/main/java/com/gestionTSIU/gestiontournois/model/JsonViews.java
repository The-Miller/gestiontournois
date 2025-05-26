package com.gestionTSIU.gestiontournois.model;

public class JsonViews {
    public static class Basic {} // Vue de base
    public static class EquipeWithTournoi extends Basic {} // Vue pour l'équipe avec le tournoi
    public static class TournoiWithEquipes extends Basic {}
    public static class MembreWithEquipe extends Basic {}
}
