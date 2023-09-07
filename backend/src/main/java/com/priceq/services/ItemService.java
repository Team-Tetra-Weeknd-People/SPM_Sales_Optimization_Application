package com.priceq.services;

import com.priceq.models.Item;
import com.priceq.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;

    public Item save(Item item) {
        return repository.save(item);
    }

    public boolean delete(String id){
        repository.deleteById(id);
        return true;
    }

    public boolean update(String id, Item updatedTtem){
        Item existingItem = repository.findById(id).orElse(null);

        if (existingItem == null) {
            return false;
        } else {
            if(updatedTtem.getItemCode() != null)
                existingItem.setItemCode(updatedTtem.getItemCode());
            if(updatedTtem.getName() != null)
                existingItem.setName(updatedTtem.getName());
            if(updatedTtem.getBarcode() != null)
                existingItem.setBarcode(updatedTtem.getBarcode());
            if(updatedTtem.getDescription() != null)
                existingItem.setDescription(updatedTtem.getDescription());
            if(updatedTtem.getBrand() != null)
                existingItem.setBrand(updatedTtem.getBrand());
            if(updatedTtem.getColor() != null)
                existingItem.setColor(updatedTtem.getColor());
            if(updatedTtem.getType() != null)
                existingItem.setType(updatedTtem.getType());
            if(updatedTtem.getMsrp() != 0)
                existingItem.setMsrp(updatedTtem.getMsrp());
            if(updatedTtem.getHsrp() != 0)
                existingItem.setHsrp(updatedTtem.getHsrp());
            if(updatedTtem.getRetailPrice() != 0)
                existingItem.setRetailPrice(updatedTtem.getRetailPrice());
            if(updatedTtem.getQuantity() != 0)
                existingItem.setQuantity(updatedTtem.getQuantity());
            if(updatedTtem.getImage() != null)
                existingItem.setImage(updatedTtem.getImage());
            repository.save(existingItem);
            return true;
        }
    }

    public List<Item> getAll(){
        return repository.findAll();
    }

    public Optional<Item> getOne(String id) {
        return repository.findById(id);
    }

}
