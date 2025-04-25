package com.nomadax.service;

import com.nomadax.entity.Hotel;
import com.nomadax.entity.Image;
import com.nomadax.exception.DuplicateHotelNameException;
import com.nomadax.repository.IHotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class HotelService {

    @Autowired
    private IHotelRepository hotelRepository;

    public List<Hotel> findAll(){
        return hotelRepository.findAll();
    }

    public Optional<Hotel> findHotelById(Long id){
        return hotelRepository.findById(id);
    }

    public Hotel save(Hotel hotel) {
        for (Image image : hotel.getImages()) {
            image.setHotel(hotel); // Esto vincula la imagen al hotel
        }

        Optional<Hotel> existingHotel = hotelRepository.findByName(hotel.getName());
        if (existingHotel.isPresent()) {
            throw new DuplicateHotelNameException("Ya existe un hotel con ese nombre");
        }
        return hotelRepository.save(hotel);
    }


    public Hotel update(Hotel updatedHotel) {
        Optional<Hotel> existingHotel = hotelRepository.findById(updatedHotel.getId());

        if (!existingHotel.isPresent()) {
            throw new RuntimeException("El hotel con id: " + updatedHotel.getId() + " no está en la BD");
        }

        Hotel hotelToUpdate = existingHotel.get();

        // Actualizamos los datos básicos
        hotelToUpdate.setName(updatedHotel.getName());
        hotelToUpdate.setDescription(updatedHotel.getDescription());
        hotelToUpdate.setAddress(updatedHotel.getAddress());
        hotelToUpdate.setCity(updatedHotel.getCity());
        hotelToUpdate.setCountry(updatedHotel.getCountry());
        hotelToUpdate.setPricePerNight(updatedHotel.getPricePerNight());
        hotelToUpdate.setCapacity(updatedHotel.getCapacity());
        hotelToUpdate.setRating(updatedHotel.getRating());

        System.out.println("updatedHotel: " + updatedHotel);
        System.out.println("hotel para actualizar: " + hotelToUpdate);

        //obtenemos las imagenes actuales
        List<Image> currentImages = hotelToUpdate.getImages();

        //obtenemos las que vienen del form
        List<Image> newImages = updatedHotel.getImages();

        //creamos lista para guardar
        List<Image> imageToKeep= new ArrayList<>();

        //recorremos cada imagen nueva
        for (Image newImage: newImages){
            //preguntamos si la imagen ya estaba es decir que tiene ID
            if (newImage.getId() != null){
                //Buscamos si ya existe en la lista actual
                for (Image oldImage : currentImages){
                    imageToKeep.add(oldImage); // la mantenemos
                    break;
                }
            }else {
                //imagen nueva ( no tiene ID) la asociamos al Hotel
                newImage.setHotel(hotelToUpdate);
                imageToKeep.add(newImage);
            }
        }

        //Reemplazamos la lista imagenes del hotel con las que tenemos que guardar
        hotelToUpdate.getImages().clear();
        hotelToUpdate.getImages().addAll(imageToKeep);

        return hotelRepository.save(hotelToUpdate);
    }


    public void delete(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new RuntimeException("No se encontró un hotel con ID: " + id);
        }
        hotelRepository.deleteById(id);
    }

    public List<Hotel> getRandomHotels() {
        List<Hotel> allHotels = hotelRepository.findAll();
        Random rand = new Random();
        List<Hotel> randomHotels = new ArrayList<>();

        // Selecciona hasta 10 hoteles aleatorios
        for (int i = 0; i < 10 && i < allHotels.size(); i++) {
            Hotel randomHotel = allHotels.get(rand.nextInt(allHotels.size()));
            randomHotels.add(randomHotel);
        }

        return randomHotels;
    }

    //hacer servicio para las paginas del hotel osea que te devuelva 10 hoteles
    //Page es de Spring Data que inclie Pageable PageRequest sort Slice
    public Page<Hotel> hotelsPageables(Pageable pageable){
        return hotelRepository.findAll(pageable);
    }

}
