package com.nomadax.service;

import com.nomadax.entity.Feature;
import com.nomadax.repository.IFeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    @Autowired
    private IFeatureRepository featureRepository;

    public Feature save(Feature feature){
        return featureRepository.save(feature);
    }

    public Feature update(Feature feature){
        Optional<Feature> featuredUpdated = featureRepository.findById(feature.getId());
        if (featuredUpdated.isPresent()){
            return featureRepository.save(feature);
        }
         throw new RuntimeException("NO EXISTE Caracteristica en la base de datos");
    }

    public Feature findById(Long id){
        Optional<Feature> featureFinded = featureRepository.findById(id);
        if (featureFinded.isPresent()) {
            return featureFinded.get();
        }
        throw new RuntimeException("NO EXISTE Caracteristica con ese id en la base de datos");
    }

    public List<Feature> findAll(){
        return featureRepository.findAll();
    }

    public String delete(Long id){
        Optional<Feature> featureToDelete = featureRepository.findById(id);
        if (featureToDelete.isPresent()) {
            featureRepository.deleteById(id);
            return "Se elimino correctamente la caracteristica con id "+ id;
        }
        throw new RuntimeException("NO EXISTE Caracteristica con ese id en la base de datos");
    }

}
