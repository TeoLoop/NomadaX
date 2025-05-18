package com.nomadax.controller;

import com.nomadax.dto.EmailRequest;
import com.nomadax.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendMail(@RequestBody EmailRequest request){
        emailService.sendReservationMail(request.getTo(), request.getSubject(), request.getBody());
        return ResponseEntity.ok("Correo enviado correctamente");
    }
}
