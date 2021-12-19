package co.edu.usa.lasartenreto3.reto3_lasarten.repositories.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import co.edu.usa.lasartenreto3.reto3_lasarten.models.Cookware;

public interface CookwareCrudRepository extends MongoRepository<Cookware, String> {
    
}
