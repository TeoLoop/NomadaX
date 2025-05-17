package com.nomadax.controller;

import com.nomadax.entity.Feature;
import com.nomadax.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristicas")
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @PostMapping
    public ResponseEntity<Feature> save(@RequestBody Feature feature){
        System.out.println(feature);
        return ResponseEntity.ok(featureService.save(feature));
    }

    @PutMapping
    public ResponseEntity<Feature> update(@RequestBody Feature feature){
        return ResponseEntity.ok(featureService.update(feature));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> findById(@PathVariable Long id){
        return ResponseEntity.ok(featureService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Feature>> findAll(){
        return ResponseEntity.ok(featureService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        return ResponseEntity.ok(featureService.delete(id));
    }
}
