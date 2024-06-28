package org.centennialcollege.carauctionsystem.auth;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String error;
}
