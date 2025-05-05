package com.nomadax.controller;

import com.nomadax.dto.UserDTO;
import com.nomadax.entity.User;
import com.nomadax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }


    //OBTIENE LA INFO DE LA PERSONA
    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> findFullNameByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserInfo(email));
    }

    //obtiene SI ES ADMIN
    @GetMapping("/isadmin/{name}")
    public ResponseEntity<Boolean> isAdmin(@PathVariable String name){
        return ResponseEntity.ok(userService.isAdmin(name));
    }
}
