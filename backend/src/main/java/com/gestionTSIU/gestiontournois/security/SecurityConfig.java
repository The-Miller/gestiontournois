// package com.gestionTSIU.gestiontournois.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(authz -> authz
//                 .requestMatchers("/api/utilisateurs/login", "/api/utilisateurs/register").permitAll()
//                 .anyRequest().authenticated()
//             );
        
//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
// }


package com.gestionTSIU.gestiontournois.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Liste des endpoints publics
    private static final String[] PUBLIC_ENDPOINTS = {
        "/api/utilisateurs/login",
        "/api/utilisateurs/register",
        "/api/utilisateurs/logout"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Configuration CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Désactivation CSRF (à activer en production si nécessaire)
            .csrf(csrf -> csrf.disable())
            
            // Gestion des sessions
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .invalidSessionUrl("/api/utilisateurs/invalid-session")
                .maximumSessions(1)
                .expiredUrl("/api/utilisateurs/session-expired")
            )
            
            // Autorisations
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                .anyRequest().authenticated()
            )
            
            // Configuration de la déconnexion
            .logout(logout -> logout
                .logoutUrl("/api/utilisateurs/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(200);
                    response.getWriter().write("Déconnexion réussie");
                })
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID", "remember-me")
                .clearAuthentication(true)
                .permitAll()
            )
            
            // Gestion des erreurs
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(401);
                    response.getWriter().write("Accès non autorisé");
                })
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(403);
                    response.getWriter().write("Accès refusé");
                })
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Configuration CORS
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"
        ));
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", "Content-Type", "Accept", "X-Requested-With", "Cache-Control"
        ));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}