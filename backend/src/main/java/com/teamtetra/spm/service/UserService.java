package com.teamtetra.spm.service;

import com.teamtetra.spm.model.Test;
import com.teamtetra.spm.model.User;
import com.teamtetra.spm.repository.UserRepository;
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
            if(!updatedUser.getFName().isEmpty())
                existingUser.setFName(updatedUser.getFName());
            if(!updatedUser.getLName().isEmpty())
                existingUser.setFName(updatedUser.getLName());
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

}


