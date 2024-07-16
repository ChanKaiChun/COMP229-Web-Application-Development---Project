package org.centennialcollege.carauctionsystem.auth;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private String error;
}
