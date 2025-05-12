package com.nomadax.repository;

import com.nomadax.entity.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IHotelRepository extends JpaRepository<Hotel, Long> {

    Optional<Hotel> findByName(String name);

    List<Hotel> findByCategoryTitleIn(List<String> titles);

    @Query("""
    SELECT h FROM Hotel h
    WHERE (:query IS NULL OR 
           LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR
           LOWER(h.city) LIKE LOWER(CONCAT('%', :query, '%')) OR
           LOWER(h.country) LIKE LOWER(CONCAT('%', :query, '%')))
      AND (:categoryIds IS NULL OR h.category.id IN :categoryIds)
      AND (
           :checkIn IS NULL OR :checkOut IS NULL OR NOT EXISTS (
               SELECT r FROM Reservation r
               WHERE r.hotel.id = h.id
                 AND (
                      (:checkIn BETWEEN r.checkIn AND r.checkOut)
                      OR (:checkOut BETWEEN r.checkIn AND r.checkOut)
                      OR (r.checkIn BETWEEN :checkIn AND :checkOut)
                  )
           )
      )
      ORDER BY h.name ASC
""")
    Page<Hotel> searchWithFilters(@Param("query") String query,
                                  @Param("categoryIds") List<Long> categoryIds,
                                  @Param("checkIn") LocalDate checkIn,
                                  @Param("checkOut") LocalDate checkOut,
                                  Pageable pageable);







}
