package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Utilisateur;
import com.gestionTSIU.gestiontournois.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        try {
            return utilisateurRepository.save(utilisateur);
        } catch (Exception e) {
            System.out.println("Erreur lors de la création de l'utilisateur : " + e.getMessage());
            throw new RuntimeException("Erreur lors de la création de l'utilisateur : " + e.getMessage());
        }
    }

    public Utilisateur authenticate(String email, String password) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email);
            if (utilisateur != null && utilisateur.getPassword().equals(password)) {
                return utilisateur;
            }
            return null;
        } catch (Exception e) {
            System.out.println("Erreur lors de l'authentification : " + e.getMessage());
            throw new RuntimeException("Erreur lors de l'authentification : " + e.getMessage());
        }
    }

    public List<Utilisateur> getAllUtilisateurs() {
        try {
            System.out.println("Récupération de tous les utilisateurs...");
            List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
            System.out.println("Nombre d'utilisateurs récupérés : " + utilisateurs.size());
            return utilisateurs;
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération des utilisateurs : " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la récupération des utilisateurs : " + e.getMessage());
        }
    }

    public Utilisateur getUtilisateurById(Long id) {
        try {
            return utilisateurRepository.findById(id).orElse(null);
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération de l'utilisateur avec ID " + id + " : " + e.getMessage());
            throw new RuntimeException("Erreur lors de la récupération de l'utilisateur : " + e.getMessage());
        }
    }

    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur) {
        try {
            Utilisateur existingUtilisateur = utilisateurRepository.findById(id).orElse(null);
            if (existingUtilisateur != null) {
                existingUtilisateur.setNom(utilisateur.getNom());
                existingUtilisateur.setPrenom(utilisateur.getPrenom());
                existingUtilisateur.setEmail(utilisateur.getEmail());
                existingUtilisateur.setPassword(utilisateur.getPassword());
                existingUtilisateur.setRole(utilisateur.getRole());
                return utilisateurRepository.save(existingUtilisateur);
            }
            return null;
        } catch (Exception e) {
            System.out.println("Erreur lors de la mise à jour de l'utilisateur avec ID " + id + " : " + e.getMessage());
            throw new RuntimeException("Erreur lors de la mise à jour de l'utilisateur : " + e.getMessage());
        }
    }

    public void deleteUtilisateur(Long id) {
        try {
            utilisateurRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Erreur lors de la suppression de l'utilisateur avec ID " + id + " : " + e.getMessage());
            throw new RuntimeException("Erreur lors de la suppression de l'utilisateur : " + e.getMessage());
        }
    }

    public Utilisateur createUser(Utilisateur user) {
        try {
            return utilisateurRepository.save(user);
        } catch (Exception e) {
            System.out.println("Erreur lors de la création de l'utilisateur : " + e.getMessage());
            throw new RuntimeException("Erreur lors de la création de l'utilisateur : " + e.getMessage());
        }
    }
}