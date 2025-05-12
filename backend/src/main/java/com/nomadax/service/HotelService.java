package com.nomadax.service;

import com.nomadax.entity.Feature;
import com.nomadax.entity.Hotel;
import com.nomadax.entity.Image;
import com.nomadax.exception.DuplicateHotelNameException;
import com.nomadax.repository.IFeatureRepository;
import com.nomadax.repository.IHotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HotelService {

    @Autowired
    private IHotelRepository hotelRepository;

    @Autowired
    private IFeatureRepository featureRepository;


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

        if (hotel.getFeatures() != null) {
            List<Feature> resolvedFeatures = hotel.getFeatures().stream()
                    .map(f -> featureRepository.findById(f.getId()).orElseThrow(() ->
                            new RuntimeException("Feature no encontrada con ID: " + f.getId())))
                    .collect(Collectors.toList());
            hotel.setFeatures(resolvedFeatures);
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
        hotelToUpdate.setCategory(updatedHotel.getCategory());

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

        if (updatedHotel.getFeatures() != null && !updatedHotel.getFeatures().isEmpty()) {
            List<Feature> resolvedFeatures = updatedHotel.getFeatures().stream()
                    .map(f -> featureRepository.findById(f.getId()).orElseThrow(() ->
                            new RuntimeException("Feature no encontrada con ID: " + f.getId())))
                    .collect(Collectors.toList());
            hotelToUpdate.setFeatures(resolvedFeatures);
        }else{
            hotelToUpdate.setFeatures(updatedHotel.getFeatures());
        }

        return hotelRepository.save(hotelToUpdate);
    }


    public void delete(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new RuntimeException("No se encontró un hotel con ID: " + id);
        }
        hotelRepository.deleteById(id);
    }

    //hacer servicio para las paginas del hotel osea que te devuelva 10 hoteles
    //Page es de Spring Data que inclie Pageable PageRequest sort Slice
    public Page<Hotel> hotelsPageables(Pageable pageable){
        return hotelRepository.findAll(pageable);
    }

    public List<Hotel> findByCategory(List<String> titles){
        return hotelRepository.findByCategoryTitleIn(titles);
    }



    public Page<Hotel> searchHotels(String query, List<Long> categories,
                                    LocalDate checkIn, LocalDate checkOut, Pageable pageable) {
        String keyword = (query != null && !query.equalsIgnoreCase("null")) ? query.toLowerCase() : null;

        return hotelRepository.searchWithFilters(keyword, categories, checkIn, checkOut, pageable);
    }

    public Set<String> destinations(){
        List<Hotel> hotelList=  hotelRepository.findAll();
        Set<String> destinationSet = new HashSet<>();

        for (Hotel hotel : hotelRepository.findAll()) {
            destinationSet.add(hotel.getCountry());
            destinationSet.add(hotel.getCity());
        }

        return destinationSet;
    }


}
