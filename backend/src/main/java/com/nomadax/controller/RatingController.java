package com.nomadax.controller;

import com.nomadax.dto.RatingDTO;
import com.nomadax.entity.Hotel;
import com.nomadax.entity.Rating;
import com.nomadax.entity.User;
import com.nomadax.service.HotelService;
import com.nomadax.service.RatingService;
import com.nomadax.service.ReservationService;
import com.nomadax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    HotelService hotelService;

    @Autowired
    UserService userService;

    @Autowired
    ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody RatingDTO dto) {
        Optional<Hotel> hotelOptional = hotelService.findHotelById(dto.getHotelId());
        Optional<User> userOptional = userService.findById(dto.getUserId());

        if (hotelOptional.isEmpty() || userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Hotel o usuario no encontrado.");
        }

        Hotel hotel = hotelOptional.get();
        User user = userOptional.get();

        boolean hasReservation = reservationService.userHasReservation(user.getId(), hotel.getId());
        if (!hasReservation) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No puedes valorar este hotel porque no tienes una reserva.");
        }

        Rating rating = new Rating();
        rating.setHotel(hotel);
        rating.setUser(user);
        rating.setRating(dto.getRating());
        rating.setComment(dto.getComment());

        Rating saved = ratingService.addRating(rating);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/{id}")
    public ResponseEntity<List<Rating>> listRatingByHotel(@PathVariable Long id) {
        return ResponseEntity.ok(ratingService.findByHotel(id));
    }

    
}
