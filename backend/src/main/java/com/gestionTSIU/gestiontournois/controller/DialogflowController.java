package com.gestionTSIU.gestiontournois.controller;

import com.beust.jcommander.internal.Lists;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequestMapping("/api/dialogflow")
@CrossOrigin(origins = "*")
public class DialogflowController {

    private static final String DIALOGFLOW_API_URL = "https://dialogflow.googleapis.com/v2/projects/chatbot-tournify-sxev/agent/sessions/";

    @PostMapping("/detectIntent")
    public ResponseEntity<String> detectIntent(@RequestParam String sessionId, @RequestParam String text) throws IOException {
        String url = DIALOGFLOW_API_URL + sessionId + ":detectIntent";

        // Requête HTTP vers Dialogflow API
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Authorization", "Bearer " + getAccessToken());
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        // Construire le JSON de la requête
        String requestBody = "{"
                + "\"queryInput\": {"
                + "  \"text\": {"
                + "    \"text\": \"" + text + "\","
                + "    \"languageCode\": \"fr\""
                + "  }"
                + "},"
                + "\"queryParams\": {"
                + "  \"timeZone\": \"Europe/Paris\""
                + "}"
                + "}";

        // Envoyer la requête
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = requestBody.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Lire la réponse
        try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            // Renvoie la réponse en tant que JSON
            return ResponseEntity.ok(response.toString());
        }
    }


    // Fonction pour obtenir un token d'accès OAuth2
    private String getAccessToken() throws IOException {
        // Chargez vos credentials JSON du compte de service ici et générez un token OAuth
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("src/main/resources/credentials/chatbot-tournify-sxev-ec6032cfc722.json"))
                .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"));
        credentials.refreshIfExpired();
        return credentials.getAccessToken().getTokenValue();
    }
}
