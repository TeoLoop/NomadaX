package com.nomadax.controller;

import com.nomadax.entity.Category;
import com.nomadax.entity.Hotel;
import com.nomadax.exception.ErrorResponse;
import com.nomadax.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> findAll(){
        return ResponseEntity.ok(categoryService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody Category category) {
        try {
            Category savedCategory = categoryService.save(category);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedCategory);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse("El Titulo de la categoria ya está en uso");
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(errorResponse);
        }
    }

    @PutMapping
    public ResponseEntity<Category> update(@RequestBody Category category){
        return ResponseEntity.ok(categoryService.update(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        categoryService.delete(id);
        return ResponseEntity.ok("Se elimino correctamente la categoria con id " + id);
    }
}
