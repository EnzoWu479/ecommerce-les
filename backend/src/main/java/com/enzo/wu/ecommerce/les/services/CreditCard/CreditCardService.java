package com.enzo.wu.ecommerce.les.services.CreditCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enzo.wu.ecommerce.les.models.CreditCard.CreditCard;
import com.enzo.wu.ecommerce.les.repositories.CreditCardRepository;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

import jakarta.transaction.Transactional;

@Service
public class CreditCardService {
    
    @Autowired
    private CreditCardRepository creditCardRepository;
    @Autowired
    private CreditCardBrandService creditCardBrandService;


    @Transactional
    public ResponseData<CreditCard> create(CreditCard creditCard) {
        try {
            creditCard.setId(null);
            creditCard.setBrand(this.creditCardBrandService.findByName(creditCard.getBrand().getName()));
            creditCard = this.creditCardRepository.save(creditCard);
            return new ResponseData<CreditCard>(creditCard);
        } catch (Exception e) {
            return new ResponseData<CreditCard>("Não foi possível salvar o cartão de crédito. Tente novamente mais tarde.");
        }
    }
}
