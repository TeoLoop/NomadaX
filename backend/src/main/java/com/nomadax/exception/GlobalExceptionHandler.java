package com.nomadax.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateHotelNameException.class)
    public ResponseEntity<Object> handleDuplicateHotelName(DuplicateHotelNameException ex) {
        // Aquí, no se envía el stack trace, solo el mensaje amigable.
        return new ResponseEntity<>(new ErrorResponse("Ya existe un hotel con ese nombre"), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {
        // Loguear el error para obtener más detalles
        ex.printStackTrace();
        // Puedes enviar el mensaje de error completo para depurar mejor
        return new ResponseEntity<>(new ErrorResponse("Ocurrió un error interno. Detalles del error: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleBadCredentials(BadCredentialsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return error;
    }



}
