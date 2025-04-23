package com.nomadax.exception;

public class DuplicateHotelNameException extends RuntimeException{
    public DuplicateHotelNameException(String message) {
        super(message);
    }
}
