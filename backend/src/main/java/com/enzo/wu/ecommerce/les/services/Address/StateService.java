package com.enzo.wu.ecommerce.les.services.Address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enzo.wu.ecommerce.les.models.Address.State;
import com.enzo.wu.ecommerce.les.repositories.StateRepository;
import com.enzo.wu.ecommerce.les.shared.ResponseData;

import jakarta.transaction.Transactional;

@Service
public class StateService {
    @Autowired
    private StateRepository stateRepository;

    @Transactional
    private ResponseData<State> create(State state) {
        try {
            state.setId(null);
            state = this.stateRepository.save(state);
            return new ResponseData<State>(state);
        } catch (Exception e) {
            return new ResponseData<State>("Erro ao criar estado");
        }
    }

    public State find(String uf) {
        State state = this.stateRepository.findByUf(uf).orElse(null);
        if (state == null) {
            State newState = new State();
            newState.setUf(uf);
            ResponseData<State> created = this.create(newState);
            return created.getData();

        }
        return state;
    }
}
