package com.teamtetra.spm.controller;

import com.teamtetra.spm.model.Test;
import com.teamtetra.spm.model.User;
import com.teamtetra.spm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/")
    public ResponseEntity<User> save(@RequestBody User body){
        User responseBody = service.save(body);

        if(responseBody == body) {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new User());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable String id , @RequestBody User body){
        boolean response = service.update(id , body);

        if(response) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
        }else{
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(body);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable String id){
        boolean response = service.delete(id);

        if(response){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new User());
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new User());
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAll(){
        List<User> dataSet = service.getAll();

        if(!dataSet.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(dataSet);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getOne(@PathVariable String id){
        Optional<User> data = service.getOne(id);

        if(data.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(data);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }
}
