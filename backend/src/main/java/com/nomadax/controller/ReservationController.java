package com.nomadax.controller;

import com.nomadax.dto.ReservationDTO;
import com.nomadax.entity.Hotel;
import com.nomadax.entity.Reservation;
import com.nomadax.entity.User;
import com.nomadax.service.HotelService;
import com.nomadax.service.ReservationService;
import com.nomadax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private HotelService hotelService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Reservation> save(@RequestBody ReservationDTO reservationInput) {

        // Buscar el hotel
        Hotel hotel = hotelService.findHotelById(reservationInput.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));
        User user = userService.findById(reservationInput.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Crear la reserva con la información proporcionada
        Reservation reservation = new Reservation();
        reservation.setHotel(hotel);
        reservation.setUser(user);
        reservation.setCheckIn(reservationInput.getCheckIn());
        reservation.setCheckOut(reservationInput.getCheckOut());

        Reservation savedReservation = reservationService.save(reservation);

        return ResponseEntity.ok(savedReservation);
    }


    @GetMapping
    public ResponseEntity<List<Reservation>> findAll(){
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReservationDTO>> findByUserId(@PathVariable Long id){
        return ResponseEntity.ok(reservationService.findByUserId(id));
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
