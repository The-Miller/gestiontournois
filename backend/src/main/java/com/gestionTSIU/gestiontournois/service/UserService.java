package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Utilisateur;
import com.gestionTSIU.gestiontournois.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<Utilisateur> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Utilisateur> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Utilisateur createUser(Utilisateur user) {
        return userRepository.save(user);
    }

    public Utilisateur updateUser(Long id, Utilisateur userDetails) {
        Utilisateur user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
