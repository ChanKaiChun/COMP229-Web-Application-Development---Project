package org.centennialcollege.carauctionsystem.auth;

import jakarta.validation.Valid;
import org.centennialcollege.carauctionsystem.config.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Users user, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation error: " + result.getFieldError().getDefaultMessage());
        }
        try{
            authService.registerUser(user);
            return ResponseEntity.ok().body("User registered successfully");
        } catch (DuplicateKeyException e){
            return ResponseEntity.badRequest().body("Email is already in use");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation error: " + result.getFieldError().getDefaultMessage());
        }
        authService.login(request);
        String jwt = jwtUtil.generateToken("admin@CentennialCollege.ca");
        return ResponseEntity.ok().body("jwt: " + jwt);
    }
}
