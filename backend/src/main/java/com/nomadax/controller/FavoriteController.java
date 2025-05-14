package com.nomadax.controller;

import com.nomadax.entity.Favorite;
import com.nomadax.entity.Hotel;
import com.nomadax.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // DTO para recibir los datos del cliente
    public static class FavoriteRequest {
        public Long userId;
        public Long hotelId;
    }

    // Agregar favorito
    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteRequest request) {
        favoriteService.addFavorite(request.userId, request.hotelId);
        return ResponseEntity.ok("Producto añadido a favoritos");
    }

    //Eliminar favorito
    @DeleteMapping
    public ResponseEntity<?> deleteFavorite(@RequestParam Long userId, @RequestParam Long hotelId) {
        favoriteService.deleteFavorite(userId, hotelId);
        return ResponseEntity.ok("Producto eliminado de favoritos");
    }

    // 📄 Obtener lista de productos favoritos
    @GetMapping("/{userId}")
    public ResponseEntity<List<Hotel>> getFavorites(@PathVariable Long userId) {
        List<Favorite> favorites = favoriteService.getFavoritesByUser(userId);
        List<Hotel> hotelList = favorites.stream()
                .map(Favorite::getHotel)
                .collect(Collectors.toList());

        return ResponseEntity.ok(hotelList);
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> isFavorite(@RequestParam Long userId, @RequestParam Long hotelId) {
        boolean exists = favoriteService.isFavorite(userId, hotelId);
        return ResponseEntity.ok(exists);
    }


}
