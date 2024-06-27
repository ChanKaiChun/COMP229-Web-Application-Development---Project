package org.centennialcollege.carauctionsystem.users;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Users {
    @Id
    private String id;
    private Integer userId;
    private String username;
    private String password;
}
