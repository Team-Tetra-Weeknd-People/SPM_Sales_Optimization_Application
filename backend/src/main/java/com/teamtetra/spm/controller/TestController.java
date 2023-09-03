package com.teamtetra.spm.controller;

import com.teamtetra.spm.model.Test;
import com.teamtetra.spm.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService service;

    @PostMapping("/")
    public ResponseEntity<Test> save(@RequestBody Test body){
        Test responseBody = service.save(body);

        if(responseBody == body) {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Test());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Test> update(@PathVariable String id , @RequestBody Test body){
        boolean response = service.update(id , body);

        if(response) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
        }else{
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(body);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Test> delete(@PathVariable String id){
        boolean response = service.delete(id);

        if(response){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Test());
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Test());
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Test>> getAll(){
        List<Test> dataSet = service.getAll();

        if(!dataSet.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(dataSet);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Test>> getOne(@PathVariable String id){
        Optional<Test> data = service.getOne(id);

        if(data.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(data);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }
}
