package com.teamtetra.spm.service;

import com.teamtetra.spm.model.Test;
import com.teamtetra.spm.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestService {

    @Autowired
    private TestRepository repository;

    public Test save(Test test) {
        return repository.save(test);
    }

    public boolean delete(String id) {
        repository.deleteById(id);
        return true;
    }

    public boolean update(String id, Test updatedObj) {
        Test existingObj = repository.findById(id).orElse(null);

        if (existingObj == null) {
            return false;
        } else {
            existingObj.setName(updatedObj.getName());
            existingObj.setNumber(updatedObj.getNumber());
            existingObj.setEmail(updatedObj.getEmail());
            existingObj.setImage(updatedObj.getImage());
            repository.save(existingObj);
            return true;
        }
    }

    public List<Test> getAll() {
        return repository.findAll();
    }

    public Optional<Test> getOne(String id) {
        return repository.findById(id);
    }
}

