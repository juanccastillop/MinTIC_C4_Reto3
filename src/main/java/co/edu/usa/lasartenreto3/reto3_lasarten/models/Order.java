package co.edu.usa.lasartenreto3.reto3_lasarten.models;

import java.util.Date;
import java.util.Map;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "orders_tb")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    
    public static String PENDING = "Pendiente";
    public static String APROVED = "Aprobada";
    public static String REJECTED = "Rechazada";
    
    @Id
    private Integer id;
    private Date registerDay;
    private String status;
    private User salesMan;
    
    private Map<String, Cookware> products;
    private Map<String, Integer> quantities;
}
