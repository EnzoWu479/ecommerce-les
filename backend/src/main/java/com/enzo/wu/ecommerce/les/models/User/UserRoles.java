package com.enzo.wu.ecommerce.les.models.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserRoles {
    ADMIN(1, "ROLE_ADMIN"),
    CLIENT(2, "ROLE_CLIENT");

    private Integer code;
    private String description;

    public static UserRoles toEnum(Integer code) {
        if (code == null) {
            return null;
        }

        for (UserRoles x : UserRoles.values()) {
            if (code.equals(x.getCode())) {
                return x;
            }
        }

        throw new IllegalArgumentException("Código inválido: " + code);
    }
    
}
