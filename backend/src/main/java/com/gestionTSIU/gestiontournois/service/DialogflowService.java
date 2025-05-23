package com.gestionTSIU.gestiontournois.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DialogflowService {

    public DetectIntentResponse detectIntent(String sessionId, String text) throws IOException {
        // Définir le projet
        String projectId = "chatbot-tournify-sxev";  // Remplacez par votre ID de projet Google Cloud

        try (SessionsClient sessionsClient = SessionsClient.create()) {
            SessionName session = SessionName.of(projectId, sessionId);

            // Créer la requête de texte
            TextInput.Builder textInput = TextInput.newBuilder().setText(text).setLanguageCode("fr-FR");

            // Créer la requête d'intention
            QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

            // Envoyer la requête à Dialogflow
            DetectIntentRequest request = DetectIntentRequest.newBuilder()
                    .setSession(session.toString())
                    .setQueryInput(queryInput)
                    .build();

            // Traiter la réponse de Dialogflow
            return sessionsClient.detectIntent(request);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IOException("Erreur lors de la communication avec Dialogflow", e);
        }
    }
}

