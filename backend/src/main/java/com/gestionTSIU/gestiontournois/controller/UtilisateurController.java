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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
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
<<<<<<< HEAD
            utilisateur.setRole("GERANT");
=======
            utilisateur.setRole("Administrateur");
>>>>>>> sauvegarde-frontend
            Utilisateur newUser = utilisateurService.createUtilisateur(utilisateur);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUtilisateur(@RequestBody Utilisateur utilisateur, HttpServletRequest request) {
        System.out.println("Tentative de connexion pour l'email : " + utilisateur.getEmail());
        try {
            Utilisateur existingUser = utilisateurService.authenticate(utilisateur.getEmail(), utilisateur.getPassword());
            System.out.println("Utilisateur trouvé dans la base : " + existingUser);
            if (existingUser != null) {
                UserDetails userDetails = new User(existingUser.getEmail(), existingUser.getPassword(), List.of());
                SecurityContextHolder.getContext().setAuthentication(
                    new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    )
                );

                HttpSession session = request.getSession(true);
                session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, 
                    SecurityContextHolder.getContext());

                UtilisateurDto userDto = new UtilisateurDto();
                userDto.setId(existingUser.getId());
                userDto.setEmail(existingUser.getEmail());
                userDto.setNom(existingUser.getNom());
                userDto.setPrenom(existingUser.getPrenom());
<<<<<<< HEAD
                userDto.setRole(existingUser.getRole() != null ? existingUser.getRole() : "GERANT");
=======
                userDto.setRole(existingUser.getRole() != null ? existingUser.getRole() : "UTILISATEUR");
>>>>>>> sauvegarde-frontend
                System.out.println("UtilisateurDto créé : " + userDto);
                return ResponseEntity.ok(userDto);
            } else {
                System.out.println("Aucun utilisateur trouvé avec les identifiants fournis.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                       .body("Échec de la connexion. Informations invalides.");
            }
        } catch (Exception e) {
            System.out.println("Exception lors de la connexion : " + e.getMessage());
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

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        try {
            return utilisateurService.getAllUtilisateurs();
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération des utilisateurs : " + e.getMessage());
            throw new RuntimeException("Erreur serveur : " + e.getMessage());
        }
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