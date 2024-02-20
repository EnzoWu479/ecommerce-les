package com.enzo.wu.ecommerce.les.models.Address;

public enum ResidentType {
    HOUSE("House"),
    APARTMENT("Apartment");

    private String name;

    ResidentType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
