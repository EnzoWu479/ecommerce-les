package com.enzo.wu.ecommerce.les.services.Address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enzo.wu.ecommerce.les.models.Address.ClientAddress;
import com.enzo.wu.ecommerce.les.repositories.ClientAddressRepository;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

import jakarta.transaction.Transactional;

@Service
public class ClientAddressService {
    @Autowired
    private AddressService addressService;
    @Autowired
    private ClientAddressRepository clientAddressRepository;

    @Transactional
    public ResponseData<ClientAddress> create(ClientAddress clientAddress) {
        try {
            clientAddress.setId(null);
            clientAddress.setAddress(this.addressService.create(clientAddress.getAddress()).getData());
            clientAddress = this.clientAddressRepository.save(clientAddress);
            return new ResponseData<ClientAddress>(clientAddress);
        } catch (Exception e) {
            return new ResponseData<ClientAddress>("Não foi possível salvar o endereço. Tente novamente mais tarde.");
        }
    }
}
