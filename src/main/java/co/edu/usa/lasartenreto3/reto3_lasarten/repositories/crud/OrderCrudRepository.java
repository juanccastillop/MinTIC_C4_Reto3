package co.edu.usa.lasartenreto3.reto3_lasarten.repositories.crud;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import co.edu.usa.lasartenreto3.reto3_lasarten.models.Order;

public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    
    //Retorna las ordenes de pedido que coincidan con la zona recibida como parametro
    @Query("{'salesMan.zone': ?0}")
    List<Order> findByZone(final String zone);
    
    //Retorna las ordenes por estado
    @Query("{status: ?0}")
    List<Order> findByStatus(final String status);
    
    //Para seleccionar la orden con el id maximo
    Optional<Order> findTopByOrderByIdDesc();
}
