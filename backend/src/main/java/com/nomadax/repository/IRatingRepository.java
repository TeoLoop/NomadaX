package com.nomadax.repository;

import com.nomadax.entity.Hotel;
import com.nomadax.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByHotel(Hotel hotel);
}
