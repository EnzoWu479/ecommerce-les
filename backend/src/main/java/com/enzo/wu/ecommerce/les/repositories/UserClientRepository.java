package com.enzo.wu.ecommerce.les.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enzo.wu.ecommerce.les.models.User.UserClient;

@Repository
public interface UserClientRepository extends JpaRepository<UserClient, Long> {
    
}
