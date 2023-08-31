package com.teamtetra.spm.repository;

import com.teamtetra.spm.model.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
}
