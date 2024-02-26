package com.enzo.wu.ecommerce.les.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.enzo.wu.ecommerce.les.models.User.User;
import com.enzo.wu.ecommerce.les.repositories.UserRepository;
import com.enzo.wu.ecommerce.les.security.UserSpringSecurity;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userData = this.userRepository.findByEmail(email);
        if (!userData.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        User user = userData.get();

        return new UserSpringSecurity(user.getId(), user.getEmail(), user.getPassword(), user.getRoles());
    }
    
}
