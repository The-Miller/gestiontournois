package com.gestionTSIU.gestiontournois;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        System.out.println("Exception capturée : " + ex.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>("Erreur interne : " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}