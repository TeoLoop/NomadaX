package com.nomadax.service;

import com.nomadax.dto.ReservationDTO;
import com.nomadax.entity.Hotel;
import com.nomadax.entity.Reservation;
import com.nomadax.repository.IReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private IReservationRepository reservationRepository;

    public Reservation save(Reservation reservation) {
        Long hotelId = reservation.getHotel().getId();
        LocalDate checkIn = reservation.getCheckIn();
        LocalDate checkOut = reservation.getCheckOut();

        List<Reservation> overlapping = reservationRepository.findOverlappingReservations(hotelId, checkIn, checkOut);

        if (!overlapping.isEmpty()) {
            throw new RuntimeException("El hotel ya está reservado en esas fechas.");
        }

        return reservationRepository.save(reservation);
    }

    public List<Reservation> findAll(){
        return reservationRepository.findAll();
    }

    public Reservation findById(Long id){
        if (reservationRepository.findById(id).isPresent()){
            return reservationRepository.findById(id).get();
        }else {
            return null;
        }
    }

    public Reservation update(Reservation reservationUpdated){
        return reservationRepository.save(reservationUpdated);
    }

    public void delete(Long id){
        reservationRepository.deleteById(id);
    }

    public boolean userHasReservation(Long userId, Long hotelId) {
        List<Reservation> reservations = reservationRepository.findByUserAndHotel(userId, hotelId);
        return !reservations.isEmpty();
    }

    public List<ReservationDTO> findByUserId(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return reservations.stream().map(reservation -> {
            ReservationDTO dto = new ReservationDTO();
            dto.setCheckIn(reservation.getCheckIn());
            dto.setCheckOut(reservation.getCheckOut());
            dto.setUserId(reservation.getUser().getId());
            dto.setHotelId(reservation.getHotel().getId());
            dto.setHotelImage(reservation.getHotel().getImages().get(0));
            dto.setHotelName(reservation.getHotel().getName());
            dto.setHotelLocation(reservation.getHotel().getCountry()+ ", "+ reservation.getHotel().getCity());
            return dto;
        }).collect(Collectors.toList());
    }

}
