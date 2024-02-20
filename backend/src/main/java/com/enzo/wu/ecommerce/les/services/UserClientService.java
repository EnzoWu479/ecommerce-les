package com.enzo.wu.ecommerce.les.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enzo.wu.ecommerce.les.models.User.UserClient;
import com.enzo.wu.ecommerce.les.repositories.UserClientRepository;

@Service
public class UserClientService {
    @Autowired
    private UserClientRepository userClientRepository;

    public UserClient findById(Long id) {
        return this.userClientRepository.findById(id).orElse(null);
    }

    @Transactional
    public UserClient create(UserClient obj) {
        obj.setId(null);
        obj = this.userClientRepository.save(obj);
        return obj;
    }

    @Transactional
    public UserClient update(UserClient obj) {
        UserClient newObj = this.findById(obj.getId());
        newObj.setBirthDate(obj.getBirthDate());
        newObj.setCpf(obj.getCpf());
        newObj.setName(obj.getName());
        return obj;
    }
}
