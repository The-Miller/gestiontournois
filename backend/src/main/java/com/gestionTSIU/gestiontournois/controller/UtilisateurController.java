package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.dto.UtilisateurDto;
import com.gestionTSIU.gestiontournois.model.Utilisateur;
import com.gestionTSIU.gestiontournois.service.UtilisateurService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            utilisateur.setRole("Administrateur");
            Utilisateur newUser = utilisateurService.createUtilisateur(utilisateur);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur existingUser = utilisateurService.authenticate(utilisateur.getEmail(), utilisateur.getPassword());
            if (existingUser != null) {
                UtilisateurDto userDto = new UtilisateurDto();
                userDto.setId(existingUser.getId());
                userDto.setEmail(existingUser.getEmail());
                userDto.setNom(existingUser.getNom());
                userDto.setPrenom(existingUser.getPrenom());
                userDto.setRole(existingUser.getRole());
                return ResponseEntity.ok(userDto);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                       .body("Échec de la connexion. Informations invalides.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Erreur serveur: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUtilisateur(HttpServletRequest request, HttpServletResponse response) {
        try {
            SecurityContextHolder.clearContext();
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            jakarta.servlet.http.Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (jakarta.servlet.http.Cookie cookie : cookies) {
                    cookie.setMaxAge(0);
                    cookie.setValue("");
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
            return ResponseEntity.ok().body("Déconnexion réussie");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Erreur lors de la déconnexion: " + e.getMessage());
        }
    }

    // 👇 Ces méthodes doivent être DANS la classe !
    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }

    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable Long id) {
        return utilisateurService.getUtilisateurById(id);
    }

    @PutMapping("/{id}")
    public Utilisateur updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        return utilisateurService.updateUtilisateur(id, utilisateur);
    }

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
    }

    @PostMapping("/create-with-role")
    public ResponseEntity<Utilisateur> createUser(@RequestBody Utilisateur user) {
        Utilisateur createdUser = utilisateurService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
