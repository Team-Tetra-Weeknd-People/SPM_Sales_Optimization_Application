package com.teamtetra.spm.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "User")
public class User {

    @Id
    private String id;
    private String fName;
    private String lName;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String contactNo;
    private String image;
    private String password;
}
