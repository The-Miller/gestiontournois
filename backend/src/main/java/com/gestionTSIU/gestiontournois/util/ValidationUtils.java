package com.gestionTSIU.gestiontournois.util;

import org.springframework.util.StringUtils;


public class ValidationUtils {

    public static boolean isValidEmail(String email) {
        return StringUtils.hasText(email) && email.contains("@");
    }

    public static boolean isValidName(String name) {
        return StringUtils.hasText(name) && name.matches("[A-Za-zÀ-ÖØ-öø-ÿ\\s'-]+");
    }
}
