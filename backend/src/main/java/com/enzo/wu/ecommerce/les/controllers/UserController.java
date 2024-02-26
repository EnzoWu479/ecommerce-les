package com.enzo.wu.ecommerce.les.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enzo.wu.ecommerce.les.models.User.User;
import com.enzo.wu.ecommerce.les.services.UserService;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/client")
    public ResponseEntity<ResponseData<User>> createClient(@RequestBody User user) {
        ResponseData<User> response = userService.createClient(user);
        if (response.hasError()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<ResponseData<User>> getById(@PathVariable Long id) {
        ResponseData<User> response = userService.findById(id);
        if (response.hasError()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok().body(response);
    }
    @PutMapping("/client/${id}")
    public ResponseEntity<ResponseData<User>> updateClient(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        ResponseData<User> response = userService.update(user);
        if (response.hasError()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok().body(response);
    }
    @DeleteMapping("/client/${id}")
    public ResponseEntity<ResponseData<User>> deleteClient(@PathVariable Long id) {
        ResponseData<User> response = userService.delete(id);
        if (response.hasError()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok().body(response);
    }
}
