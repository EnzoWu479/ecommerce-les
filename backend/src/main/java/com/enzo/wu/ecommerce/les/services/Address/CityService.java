package com.enzo.wu.ecommerce.les.services.Address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enzo.wu.ecommerce.les.models.Address.City;
import com.enzo.wu.ecommerce.les.repositories.CityRepository;

import jakarta.transaction.Transactional;

@Service
public class CityService {
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private StateService stateService;

    @Transactional
    private City create(City city) {
        try {
            city.setId(null);
            city.setState(stateService.find(city.getState().getUf()));
            city = this.cityRepository.save(city);
            return city;
        } catch (Exception e) {
            return null;
        }
    }
    public City findByNameAndState(String name, String uf) {
        City city = this.cityRepository.findByNameAndState(name, uf).orElse(null);
        if (city == null) {
            City newCity = new City();
            newCity.setName(name);
            newCity.setState(stateService.find(uf));
            return this.create(newCity);
        }
        return city;
    }
}
