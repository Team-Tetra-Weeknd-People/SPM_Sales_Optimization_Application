package com.priceq.services;

import com.priceq.models.Review;
import com.priceq.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    public Review save(Review review) {
        review.setCreatedAt(LocalDate.now());
        return repository.save(review);
    }

    public boolean delete(String id){
        repository.deleteById(id);
        return true;
    }

    public boolean update(String id, Review updatedItem){
        Review existingItem = repository.findById(id).orElse(null);



        if (existingItem == null) {
            return false;
        } else {
            if(updatedItem.getItemID() != null)
                existingItem.setItemID(updatedItem.getItemID());
            if(updatedItem.getDescription() != null)
                existingItem.setDescription(updatedItem.getDescription());
            if(updatedItem.getRating() != 0)
                existingItem.setRating(updatedItem.getRating());
            existingItem.setCreatedAt(LocalDate.now());
            repository.save(existingItem);
            return true;
        }
    }

    public List<Review> getAll(){
        return repository.findAll();
    }

    public Optional<Review> getOne(String id) {
        return repository.findById(id);
    }

    public List<Review> getNewestRows(){
        return repository.findTop8ByOrderByCreatedAtDesc();
    }

    public List<Review> getTop5ReviewsByRating() {
        return repository.findTop5ByOrderByRatingDesc();
    }
}
