package co.edu.usa.lasartenreto3.reto3_lasarten.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.lasartenreto3.reto3_lasarten.models.Cookware;
import co.edu.usa.lasartenreto3.reto3_lasarten.repositories.crud.CookwareCrudRepository;

@Repository
public class CookwareRepository {
    
    @Autowired
    private CookwareCrudRepository cookwareCrudRepository;

    public List<Cookware> getAll() {
        return cookwareCrudRepository.findAll();
    }

    public Optional<Cookware> getCook(String reference) {
        return cookwareCrudRepository.findById(reference);
    }
    public Cookware create(Cookware cook) {
        return cookwareCrudRepository.save(cook);
    }

    public void update(Cookware cook) {
        cookwareCrudRepository.save(cook);
    }
    
    public void delete(Cookware cook) {
        cookwareCrudRepository.delete(cook);
    }
}
