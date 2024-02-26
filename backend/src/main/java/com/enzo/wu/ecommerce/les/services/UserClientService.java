package com.enzo.wu.ecommerce.les.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.enzo.wu.ecommerce.les.models.Address.ClientAddress;
import com.enzo.wu.ecommerce.les.models.CreditCard.CreditCard;
import com.enzo.wu.ecommerce.les.models.User.UserClient;
import com.enzo.wu.ecommerce.les.repositories.UserClientRepository;
import com.enzo.wu.ecommerce.les.services.Address.ClientAddressService;
import com.enzo.wu.ecommerce.les.services.CreditCard.CreditCardService;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

@Service
public class UserClientService {

    @Autowired
    private UserClientRepository userClientRepository;
    @Autowired
    private ClientAddressService clientAddressService;
    @Autowired
    private CreditCardService creditCardService;

    public ResponseData<UserClient> getById(Long id) {
        try {
            UserClient obj = this.userClientRepository.findById(id).orElse(null);
            return new ResponseData<UserClient>(obj);
        } catch (Exception e) {
            return new ResponseData<UserClient>(e.getMessage());
        }
    }

    @Transactional
    public ResponseData<UserClient> createClient(UserClient obj) {
        try {
            obj.setId(null);
            obj.setAddresses(
                    obj.getAddresses().stream().map(address -> {
                        address.setId(null);
                        ResponseData<ClientAddress> response = this.clientAddressService.create(address);

                        if (response.hasError()) {
                            throw new RuntimeException(response.getError());
                        }
                        return response.getData();
                    }).toList());

            obj.setCreditCards(
                    obj.getCreditCards().stream().map(creditCard -> {
                        creditCard.setId(null);
                        ResponseData<CreditCard> response = this.creditCardService.create(creditCard);

                        if (response.hasError()) {
                            throw new RuntimeException(response.getError());
                        }
                        return response.getData();
                    }).toList());

            obj = this.userClientRepository.save(obj);

            return new ResponseData<UserClient>(obj);
        } catch (Exception e) {
            return new ResponseData<UserClient>(e.getMessage());
        }
    }

    @Transactional
    public ResponseData<UserClient> updateClient(UserClient obj) {
        try {
            ResponseData<UserClient> response = this.getById(obj.getId());

            if (response.hasError()) {
                throw new RuntimeException(response.getError());
            }

            UserClient userClient = response.getData();

            userClient.setName(obj.getName());
            userClient.setBirthDate(
                obj.getBirthDate() != null ? obj.getBirthDate() : userClient.getBirthDate()
            );

            userClient.setAddresses(
                obj.getAddresses().stream().map(address -> {
                    if (address.getId() == null) {
                        address.setId(null);
                        ResponseData<ClientAddress> responseAddress = this.clientAddressService.create(address);

                        if (responseAddress.hasError()) {
                            throw new RuntimeException(responseAddress.getError());
                        }
                        return responseAddress.getData();
                    } else {
                        return address;
                    }
                }).toList()
            );

            userClient.setCreditCards(
                obj.getCreditCards().stream().map(creditCard -> {
                    if (creditCard.getId() == null) {
                        creditCard.setId(null);
                        ResponseData<CreditCard> responseCreditCard = this.creditCardService.create(creditCard);

                        if (responseCreditCard.hasError()) {
                            throw new RuntimeException(responseCreditCard.getError());
                        }
                        return responseCreditCard.getData();
                    } else {
                        return creditCard;
                    }
                }).toList()
            );

            obj = this.userClientRepository.save(obj);
            return new ResponseData<UserClient>(obj);
        } catch (Exception e) {
            return new ResponseData<UserClient>(e.getMessage());
        }
    }
}
