package com.enzo.wu.ecommerce.les.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enzo.wu.ecommerce.les.models.CreditCard.CreditCardBrand;

public interface CreditCardBrandRepository extends JpaRepository<CreditCardBrand, Long> {
    Optional<CreditCardBrand> findByName(String name);
}
