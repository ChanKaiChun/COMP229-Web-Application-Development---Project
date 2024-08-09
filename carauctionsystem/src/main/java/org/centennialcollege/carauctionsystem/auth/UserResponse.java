package org.centennialcollege.carauctionsystem.auth;

import lombok.Data;

@Data
public class UserResponse {
    private String name;
    private String contact;

    public UserResponse(Users user) {
        this.name = user.getFirstName() + " " + user.getLastName();
        this.contact = user.getEmail();
    }
}
