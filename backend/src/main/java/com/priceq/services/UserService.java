package com.priceq.services;

import com.priceq.models.User;
import com.priceq.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public boolean delete(String id){
        repository.deleteById(id);
        return true;
    }

    public boolean update(String id, User updatedUser){
        User existingUser = repository.findById(id).orElse(null);

        if (existingUser == null) {
            return false;
        } else {
            if(!updatedUser.getFirstName().isEmpty())
                existingUser.setFirstName(updatedUser.getFirstName());
            if(!updatedUser.getLastName().isEmpty())
                existingUser.setFirstName(updatedUser.getLastName());
            if(!updatedUser.getEmail().isEmpty())
                existingUser.setEmail(updatedUser.getEmail());
            if(!updatedUser.getContactNo().isEmpty())
                existingUser.setContactNo(updatedUser.getContactNo());
            if(!updatedUser.getImage().isEmpty())
                existingUser.setImage(updatedUser.getImage());
            if(!updatedUser.getPassword().isEmpty())
                existingUser.setPassword(updatedUser.getPassword());
            repository.save(existingUser);
            return true;
        }
    }

    public List<User> getAll(){
        return repository.findAll();
    }

    public Optional<User> getOne(String id) {
        return repository.findById(id);
    }

    public String login(User user){
        User existingUser = repository.findByEmail(user.getEmail());

        if(existingUser == null){
            return "email";
        }else {
            if(existingUser.getPassword().equals(user.getPassword())){
                return existingUser.getId();
            }else{
                return "password";
            }
        }
    }
}


