package com.nomadax.controller;

import com.nomadax.config.JwtService;
import com.nomadax.dto.AuthRequest;
import com.nomadax.dto.AuthResponse;
import com.nomadax.dto.RegisterRequest;
import com.nomadax.entity.Role;
import com.nomadax.entity.User;
import com.nomadax.exception.GlobalExceptionHandler;
import com.nomadax.repository.IUserRepository;
import com.nomadax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        System.out.println("Email recibido: " + authRequest.getEmail());
        System.out.println("Contraseña recibida: " + authRequest.getPassword());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales incorrectas");
        }

        final UserDetails userDetails = userService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("El email ya esta registrado.");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEnable(true);

        //asignar rol segun el registerRequest
        if (registerRequest.isAdmin()){
            user.setRole(Role.ADMIN);
        }else{
            user.setRole(Role.USER);
        }

        //Guardo el user en la BD
        userRepository.save(user);

        //genero token
        UserDetails userDetails = userService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);

        //devuelvo token
        return ResponseEntity.ok(new AuthResponse(token));
    }

}
