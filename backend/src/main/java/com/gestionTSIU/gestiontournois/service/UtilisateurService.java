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

    // Méthode pour créer un nouvel utilisateur (Inscription)
    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        // Vérifiez si l'utilisateur existe déjà par email
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé.");
        }
        return utilisateurRepository.save(utilisateur);
    }

    // Méthode pour authentifier un utilisateur (Connexion)
    public Utilisateur authenticate(String email, String password) {
        // Chercher l'utilisateur par email et vérifier le mot de passe
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email);
        if (utilisateur != null && utilisateur.getPassword().equals(password)) {
            return utilisateur;
        }
        return null; // Retourne null si l'authentification échoue
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }

    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateurDetails) {
        Utilisateur utilisateur = getUtilisateurById(id);
        if (utilisateur != null) {
            utilisateur.setNom(utilisateurDetails.getNom());
            utilisateur.setPrenom(utilisateurDetails.getPrenom());
            utilisateur.setEmail(utilisateurDetails.getEmail());
            utilisateur.setPassword(utilisateurDetails.getPassword());
            utilisateur.setRole(utilisateurDetails.getRole());
            return utilisateurRepository.save(utilisateur);
        }
        return null;
    }

    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public Utilisateur createUser(Utilisateur user) {
        // Ajoutez la logique pour définir le rôle et sauvegarder l'utilisateur
        user.setRole(user.getRole()); // Définir le rôle, par exemple 'CommunityManager'
        return utilisateurRepository.save(user);
    }
}
