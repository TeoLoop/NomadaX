package com.nomadax.service;

import com.nomadax.entity.Category;
import com.nomadax.exception.DuplicateCategoryTitleException;
import com.nomadax.exception.DuplicateHotelNameException;
import com.nomadax.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    public List<Category> findAll(){
        return categoryRepository.findAll();
    }

    public Category save(Category category){
        Optional<Category> existingHotel = categoryRepository.findByTitle(category.getTitle());
        if (existingHotel.isPresent()) {
            throw new DuplicateCategoryTitleException("Ya existe una Categoria con ese titulo");
        }
        return categoryRepository.save(category);
    }

    public Category update(Category category){
        return categoryRepository.save(category);
    }

    public void delete(Long id){
        categoryRepository.deleteById(id);
    }
}
