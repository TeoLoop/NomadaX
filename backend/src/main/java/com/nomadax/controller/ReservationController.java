package com.nomadax.controller;

import com.nomadax.entity.Hotel;
import com.nomadax.entity.Reservation;
import com.nomadax.service.HotelService;
import com.nomadax.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public ResponseEntity<Reservation> save(@RequestBody Reservation reservationInput) {
        Hotel hotel = hotelService.findHotelById(reservationInput.getHotel().getId())
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));

        reservationInput.setHotel(hotel);
        Reservation saved = reservationService.save(reservationInput);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> findAll(){
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> findById(@PathVariable Long id){
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @PutMapping
    public ResponseEntity<Reservation> update(@RequestBody Reservation reservation){
        return ResponseEntity.ok(reservationService.update(reservation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        reservationService.delete(id);
        return ResponseEntity.ok("Se elimino correctamente la Reservacion con id " + id);
    }

}
