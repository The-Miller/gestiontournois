package com.gestionTSIU.gestiontournois.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Gestion de Tournois Sportifs Inter-Universitaires")
                        .version("1.0")
                        .description("Cette documentation décrit l'API REST pour la gestion des tournois sportifs inter-universitaires.")
                );
    }
}
