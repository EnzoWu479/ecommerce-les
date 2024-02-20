package com.enzo.wu.ecommerce.les.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enzo.wu.ecommerce.les.models.Address.Address;
import com.enzo.wu.ecommerce.les.repositories.AddressRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public Address findById(Long id) {
        return this.addressRepository.findById(id).orElse(null);
    }

    @Transactional
    public Address create(Address obj) {
        obj.setId(null);
        obj = this.addressRepository.save(obj);
        return obj;
    }

    @Transactional
    public Address update(Address obj) {
        Address newObj = this.findById(obj.getId());
        newObj.setCity(obj.getCity());
        newObj.setComplement(obj.getComplement());
        newObj.setNumber(obj.getNumber());
        newObj.setStreet(obj.getStreet());
        newObj.setZipcode(obj.getZipcode());
        return this.addressRepository.save(newObj);
    }
}
