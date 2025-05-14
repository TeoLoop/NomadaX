package com.nomadax.service;

import com.nomadax.entity.Hotel;
import com.nomadax.entity.Rating;
import com.nomadax.repository.IHotelRepository;
import com.nomadax.repository.IRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private IRatingRepository ratingRepository;

    @Autowired
    private IHotelRepository hotelRepository;

    public void updateHotelAverageRating(Long hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();

        List<Rating> ratings = ratingRepository.findByHotel(hotel);
        double average = ratings.stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);

        hotel.setRating(average);
        hotelRepository.save(hotel);
    }

    public Rating addRating(Rating rating) {
        Rating savedRating = ratingRepository.save(rating);
        updateHotelAverageRating(rating.getHotel().getId());
        return savedRating;
    }

    public List<Rating> findByHotel(Long hotelId){
        Optional<Hotel> hotel= hotelRepository.findById(hotelId);
        return hotel.map(value -> ratingRepository.findByHotel(value)).orElse(null);
    }
}