package com.teamtetra.spm.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "Test")
public class Test {

    @Id
    private String id;
    private String name;
    private String number;
}
