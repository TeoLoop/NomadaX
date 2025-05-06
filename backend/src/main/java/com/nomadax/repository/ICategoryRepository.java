package com.nomadax.repository;

import com.nomadax.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByTitle(String title);
}
