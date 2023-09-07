package com.teamtetra.spm.service;

import com.teamtetra.spm.model.Item;
import com.teamtetra.spm.repository.ItemRepository;
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
            existingItem.setItemCode(updatedTtem.getItemCode());
            existingItem.setName(updatedTtem.getName());
            existingItem.setBarcode(updatedTtem.getBarcode());
            existingItem.setDescription(updatedTtem.getDescription());
            existingItem.setBrand(updatedTtem.getBrand());
            existingItem.setColor(updatedTtem.getColor());
            existingItem.setType(updatedTtem.getType());
            existingItem.setMsrp(updatedTtem.getMsrp());
            existingItem.setHsrp(updatedTtem.getHsrp());
            existingItem.setRetailPrice(updatedTtem.getRetailPrice());
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
