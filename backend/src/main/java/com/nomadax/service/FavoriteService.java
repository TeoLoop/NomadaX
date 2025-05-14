package com.nomadax.service;

import com.nomadax.entity.Favorite;
import com.nomadax.entity.Hotel;
import com.nomadax.entity.User;
import com.nomadax.repository.IFavoriteRepository;
import com.nomadax.repository.IHotelRepository;
import com.nomadax.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private IFavoriteRepository favoriteRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IHotelRepository hotelRepository;



    public void addFavorite(Long userId, Long hotelId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));

        if (!favoriteRepository.existsByUserAndHotel(user, hotel)) {
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setHotel(hotel);
            favoriteRepository.save(favorite);
        }
    }

    //Spring abra una transacción antes de ejecutar el método y la cierre (confirmando o revirtiendo) al terminar
    @Transactional
    public void deleteFavorite(Long userId, Long hotelId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));

        favoriteRepository.deleteByUserAndHotel(user, hotel);
    }

    public List<Favorite> getFavoritesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return favoriteRepository.findByUser(user);
    }


    public Boolean isFavorite(Long userId, Long hotelId) {
        return favoriteRepository.existsByUserIdAndHotelId(userId, hotelId);
    }

}
