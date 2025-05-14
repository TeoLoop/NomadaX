package com.nomadax.repository;

import com.nomadax.entity.Favorite;
import com.nomadax.entity.Hotel;
import com.nomadax.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IFavoriteRepository  extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndHotel(User user, Hotel hotel);

    List<Favorite> findByUser(User user);

    boolean existsByUserAndHotel(User user, Hotel hotel);

    void deleteByUserAndHotel(User user, Hotel hotel);

    boolean existsByUserIdAndHotelId(Long userId, Long hotelId);

}
