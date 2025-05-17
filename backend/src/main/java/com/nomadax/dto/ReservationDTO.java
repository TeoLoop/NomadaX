package com.nomadax.dto;

import com.nomadax.entity.Image;

import java.time.LocalDate;

public class ReservationDTO {
    private Long hotelId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Long userId;

    private Image hotelImage;
    private String hotelName;
    private String hotelLocation;


    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Image getHotelImage() {
        return hotelImage;
    }

    public void setHotelImage(Image hotelImage) {
        this.hotelImage = hotelImage;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelLocation() {
        return hotelLocation;
    }

    public void setHotelLocation(String hotelLocation) {
        this.hotelLocation = hotelLocation;
    }
}
