package com.enzo.wu.ecommerce.les.services;

import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enzo.wu.ecommerce.les.models.User.User;
import com.enzo.wu.ecommerce.les.models.User.UserRoles;
import com.enzo.wu.ecommerce.les.repositories.UserClientRepository;
import com.enzo.wu.ecommerce.les.repositories.UserRepository;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserClientRepository userClientRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseData<User> findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            return new ResponseData<User>("Usuário não encontrado");
        }
        return new ResponseData<User>(user.orElse(null));
    }

    @Transactional
    public ResponseData<User> createClient(User obj) {
        try {
            obj.setId(null);
            obj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
            obj.setRoles(
                Stream.of(UserRoles.CLIENT.getCode()).collect(Collectors.toSet())
            );

            if (obj.getUserClient() != null) {
                obj.getUserClient().setId(null);

                obj.setUserClient(
                        userClientRepository.save(obj.getUserClient()));
            }

            obj = this.userRepository.save(obj);

            return new ResponseData<User>(obj);
        } catch (Exception e) {
            return new ResponseData<User>("Erro ao criar usuário");
        }
    }

    @Transactional
    public ResponseData<User> create(User obj) {
        try {
            obj.setId(null);
            obj = this.userRepository.save(obj);
            return new ResponseData<User>(obj);
        } catch (Exception e) {
            return new ResponseData<User>("Erro ao criar usuário");
        }
    }

    @Transactional
    public ResponseData<User> update(User obj) {
        try {
            ResponseData<User> userData = this.findById(obj.getId());
            User user = userData.getData();

            if (user == null) {
                return new ResponseData<User>("Usuário não encontrado");
            }

            user.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
            return new ResponseData<User>(this.userRepository.save(user));
        } catch (Exception e) {
            return new ResponseData<User>("Erro ao atualizar usuário");
        }
    }

    public ResponseData<User> delete(Long id) {
        this.findById(id);
        try {
            this.userRepository.deleteById(id);
            return new ResponseData<User>();
        } catch (Exception e) {
            return new ResponseData<User>("Erro ao excluir usuário");
        }
    }
}
