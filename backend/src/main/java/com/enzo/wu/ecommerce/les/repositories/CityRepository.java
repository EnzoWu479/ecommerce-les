package com.enzo.wu.ecommerce.les.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enzo.wu.ecommerce.les.models.Address.City;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByName(String name);
    // findByNameAndState
    Optional<City> findByNameAndState(String name, String uf);
}
