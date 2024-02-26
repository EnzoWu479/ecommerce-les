package com.enzo.wu.ecommerce.les.services.Address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enzo.wu.ecommerce.les.models.Address.Address;
import com.enzo.wu.ecommerce.les.repositories.AddressRepository;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private CityService cityService;


    public ResponseData<Address> findById(Long id) {
        Address address = this.addressRepository.findById(id).orElse(null);
        if (address == null) {
            return new ResponseData<Address>("Endereço não encontrado");
        }
        return new ResponseData<Address>(address);
    }

    @Transactional
    public ResponseData<Address> create(Address obj) {
        try {
            obj.setId(null);
            obj.setCity(
                this.cityService.findByNameAndState(
                    obj.getCity().getName(), 
                    obj.getCity().getState().getUf()
                )
            );
            obj = this.addressRepository.save(obj);
            return new ResponseData<Address>(obj);
        } catch (Exception e) {
            return new ResponseData<Address>("Erro ao criar endereço");
        }
    }

    @Transactional
    public Address update(Address obj) {
        Address newObj = this.findById(obj.getId()).getData();
        newObj.setCity(
            this.cityService.findByNameAndState(
                obj.getCity().getName(), 
                obj.getCity().getState().getUf()
            )
        );
        newObj.setComplement(obj.getComplement());
        newObj.setNumber(obj.getNumber());
        newObj.setStreet(obj.getStreet());
        newObj.setZipcode(obj.getZipcode());
        return this.addressRepository.save(newObj);
    }
}
