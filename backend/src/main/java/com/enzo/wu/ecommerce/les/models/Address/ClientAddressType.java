package com.enzo.wu.ecommerce.les.models.Address;

public enum ClientAddressType {
    BILLING("Billing"),
    RESIDENCE("Residence"),
    SHIPPING("Shipping");

    private String name;

    ClientAddressType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
