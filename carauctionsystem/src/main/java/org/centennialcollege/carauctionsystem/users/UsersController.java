package org.centennialcollege.carauctionsystem.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("users")
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @GetMapping()
    List<Users> all() {
        return usersRepository.findAll();
    }
}
