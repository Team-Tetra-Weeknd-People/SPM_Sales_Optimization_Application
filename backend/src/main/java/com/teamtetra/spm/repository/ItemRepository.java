package com.teamtetra.spm.repository;

import com.teamtetra.spm.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, String> {
}
