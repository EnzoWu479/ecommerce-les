package com.enzo.wu.ecommerce.les.services.CreditCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enzo.wu.ecommerce.les.models.CreditCard.CreditCardBrand;
import com.enzo.wu.ecommerce.les.repositories.CreditCardBrandRepository;

import jakarta.transaction.Transactional;

@Service
public class CreditCardBrandService {
    @Autowired
    private CreditCardBrandRepository creditCardBrandRepository;

    @Transactional
    private CreditCardBrand create(CreditCardBrand creditCardBrand) {
        try {
            creditCardBrand.setId(null);
            creditCardBrand = this.creditCardBrandRepository.save(creditCardBrand);
            return creditCardBrand;
        } catch (Exception e) {
            return null;
        }
    }
    public CreditCardBrand findByName(String name) {
        CreditCardBrand creditCardBrand = this.creditCardBrandRepository.findByName(name).orElse(null);
        if (creditCardBrand == null) {
            CreditCardBrand newCreditCardBrand = new CreditCardBrand();
            newCreditCardBrand.setName(name);
            return this.create(newCreditCardBrand);
        }
        return creditCardBrand;
    }
}
