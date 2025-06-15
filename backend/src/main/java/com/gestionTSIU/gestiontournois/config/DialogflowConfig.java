package com.gestionTSIU.gestiontournois.config;

import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class DialogflowConfig {

    @Bean
    public GoogleCredentials googleCredentials() throws IOException {
        return GoogleCredentials.fromStream(new FileInputStream("src/main/resources/credentials/chatbot-tournify-sxev-9978e5cfb5ad.json"))
                .createScoped("https://www.googleapis.com/auth/cloud-platform");
    }
}
