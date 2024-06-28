package org.centennialcollege.carauctionsystem.auth;

import org.centennialcollege.carauctionsystem.users.Users;
import org.centennialcollege.carauctionsystem.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UsersRepository usersRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public void registerUser(Users user) throws DuplicateKeyException {
        passwordEncoder.encode(user.getPassword());
        usersRepository.save(user);
    }

    public UserDetails login(LoginRequest request) throws UsernameNotFoundException {
        Users user = usersRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usersRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}
