package com.enzo.wu.ecommerce.les.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enzo.wu.ecommerce.les.models.CreditCard.CreditCard;

public interface  CreditCardRepository extends JpaRepository<CreditCard, Long> {
    
}
