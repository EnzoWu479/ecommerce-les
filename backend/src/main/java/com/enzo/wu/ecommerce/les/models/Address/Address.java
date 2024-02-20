package com.enzo.wu.ecommerce.les.models.Address;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = Address.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Address {
    public static final String TABLE_NAME = "address";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adr_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "adr_street", nullable = false, length = 100)
    private String street;

    @Column(name = "adr_number", nullable = false, length = 10)
    private String number;

    @Column(name = "adr_zipcode", length = 8, nullable = false)
    private String zipcode;

    @Column(name = "adr_complement", length = 100)
    private String complement;

    @Column(name = "adr_residentType", length = 100)
    private ResidentType residentType;

    @ManyToOne(optional = false)
    private City city;

    @OneToOne(mappedBy = "address")
    private ClientAddress clientAddress;
}
