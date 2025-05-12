package com.nomadax.controller;

import com.nomadax.entity.Hotel;
import com.nomadax.exception.ErrorResponse;
import com.nomadax.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;


    //Guardar un Hotel
    @PostMapping
    public ResponseEntity<Object> save(@RequestBody Hotel hotel){
        try {
            Hotel savedHotel = hotelService.save(hotel);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedHotel);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse("El nombre del hotel ya está en uso");
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(errorResponse);
        }

    }

    //Obtener todos para publico
    @GetMapping
    public ResponseEntity<List<Hotel>> findAll(){
        List<Hotel> hotels =  hotelService.findAll();
        return ResponseEntity.ok(hotels);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> findHotelById(@PathVariable Long id){
        Hotel hotel = hotelService.findHotelById(id)
                .orElseThrow(() -> new RuntimeException("No existe Hotel con id " + id));
        return ResponseEntity.ok(hotel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.delete(id);
        return ResponseEntity.noContent().build(); // Respuesta con código 204 (No Content)
    }

    @PutMapping
    public ResponseEntity<Hotel> update(@RequestBody Hotel hotel) {
        if (hotel.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        Hotel updatedHotel = hotelService.update(hotel);  // Aquí se usa el hotel completo con el id en el cuerpo
        return ResponseEntity.ok(updatedHotel);
    }


    @GetMapping("/hoteles")
    public ResponseEntity<Page<Hotel>> getHotels(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam (defaultValue = "10") int size){ //pasamos nro de pagina y nro de hoteles
        Pageable pageable = PageRequest.of(page,size);
        Page<Hotel> hotels = hotelService.hotelsPageables(pageable);
        return ResponseEntity.ok(hotels);
    }

    //Obtener Hoteles Por categoria
    @GetMapping("/categorias")
    public ResponseEntity<List<Hotel>> findByCategory(@RequestParam List<String> titles){
        List <Hotel> hotelsCategory = hotelService.findByCategory(titles);
        return ResponseEntity.ok(hotelsCategory);
    }


    @GetMapping("/search")
    public Page<Hotel> searchHotels(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String[] categories,  
            @RequestParam(required = false) String checkIn,
            @RequestParam(required = false) String checkOut,
            Pageable pageable) {

        LocalDate checkInDate = null;
        LocalDate checkOutDate = null;

        // Validar que checkIn y checkOut no sean "null" como string antes de parsear
        if (checkIn != null && !checkIn.equals("null") && !checkIn.isEmpty()) {
            checkInDate = LocalDate.parse(checkIn);
        }
        if (checkOut != null && !checkOut.equals("null") && !checkOut.isEmpty()) {
            checkOutDate = LocalDate.parse(checkOut);
        }

        // Convertir el array de categorías en una lista de Longs
        List<Long> categoryIds = null;

        if (categories != null && categories.length > 0) {
            categoryIds = Arrays.stream(categories)
                    .filter(category -> !category.equalsIgnoreCase("null"))
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
        }

        return hotelService.searchHotels(query, categoryIds, checkInDate, checkOutDate, pageable);
    }




}
