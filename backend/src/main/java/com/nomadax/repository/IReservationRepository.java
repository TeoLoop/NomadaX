package com.nomadax.repository;

import com.nomadax.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.hotel.id = :hotelId AND " +
            "(:checkIn < r.checkOut AND :checkOut > r.checkIn)")
    List<Reservation> findOverlappingReservations(@Param("hotelId") Long hotelId,
                                                  @Param("checkIn") LocalDate checkIn,
                                                  @Param("checkOut") LocalDate checkOut);

    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId AND r.hotel.id = :hotelId")
    List<Reservation> findByUserAndHotel(@Param("userId") Long userId, @Param("hotelId") Long hotelId);

    List<Reservation> findByUserId(Long userId);


}
