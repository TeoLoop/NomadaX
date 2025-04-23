package com.nomadax.controller;

import com.nomadax.entity.Hotel;
import com.nomadax.service.FileService;
import com.nomadax.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    private final FileService fileService;

    @Autowired
    public HotelController(FileService fileService) {
        this.fileService = fileService;
    }

    //Guardar un Hotel
    @PostMapping
    public ResponseEntity<Hotel> save(@RequestBody Hotel hotel){
        Hotel savedHotel = hotelService.save(hotel);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedHotel);
    }

    //Obtener todos
    @GetMapping
    public ResponseEntity<List<Hotel>> update(){
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

    @GetMapping("/random")
    public List<Hotel> getRandomHotels() {
        return hotelService.getRandomHotels();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable Long id, Hotel hotel){
        return ResponseEntity.ok(hotelService.update(hotel));
    }

    @PostMapping("/{hotelId}/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable("hotelId") String hotelId) {
        String filename = fileService.storeFile(file, hotelId); // cambia a que devuelva el nombre
        String fileDownloadUri = "/uploads/" + filename;
        return ResponseEntity.ok(fileDownloadUri);
    }

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileService.loadFileAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(file);
    }
}
