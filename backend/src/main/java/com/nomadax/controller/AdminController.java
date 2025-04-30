package com.nomadax.controller;

import com.nomadax.entity.Hotel;
import com.nomadax.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private HotelService hotelService;

    //Protegido: Solo para admin
    @GetMapping
    public ResponseEntity<List<Hotel>> findAllForAdmin(){
        List<Hotel> hotels =  hotelService.findAll();
        return ResponseEntity.ok(hotels);
    }
}
