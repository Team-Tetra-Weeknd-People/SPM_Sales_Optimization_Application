package com.priceq.repositories;

import com.priceq.models.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByBrand(String brand);
    List<Item> findByColor(String color);
    List<Item> findByType(String type);
}
