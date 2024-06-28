package org.centennialcollege.carauctionsystem.auth;

import jakarta.validation.Valid;
import org.centennialcollege.carauctionsystem.common.GeneralResponse;
import org.centennialcollege.carauctionsystem.config.JwtUtil;
import org.centennialcollege.carauctionsystem.users.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Users user, BindingResult result) {
        Map<String, String> response = new HashMap<>();
        if (result.hasErrors()) {
            if(result.getFieldError()!=null){
                response.put("message", "Validation error: " + result.getFieldError().getDefaultMessage());
                return ResponseEntity.badRequest().body(response);
            }
        }
        try{
            authService.registerUser(user);
            response.put("message", "User registered successfully");
            return ResponseEntity.ok().body(response);
        } catch (DuplicateKeyException e){
            response.put("message", "Email is already in use");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult result) {
        LoginResponse response = new LoginResponse();
        if (result.hasErrors()) {
            response.setError("Validation: " + result.getFieldError().getDefaultMessage());
            return ResponseEntity.badRequest().body(response);
        }
        try{
            UserDetails details = authService.login(request);
            String jwt = jwtUtil.generateToken(details.getUsername());
            response.setToken(jwt);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            response.setError(e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
