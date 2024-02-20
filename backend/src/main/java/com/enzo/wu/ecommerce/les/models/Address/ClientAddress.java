package com.enzo.wu.ecommerce.les.models.Address;

import java.util.Set;

import com.enzo.wu.ecommerce.les.models.User.UserClient;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = ClientAddress.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class ClientAddress {
    public static final String TABLE_NAME = "user_address";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_adr_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_cli_address", nullable = false, referencedColumnName = "adr_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "usr_cli_id", nullable = false)
    private UserClient userClient;

    @ElementCollection(targetClass = ClientAddressType.class, fetch = FetchType.LAZY)
    @JoinTable(name = "client_address_type", joinColumns = @JoinColumn(name = "usr_adr_id"))
    @Column(name = "address_type")
    @Enumerated(EnumType.STRING) // ou EnumType.ORDINAL, dependendo de como você deseja armazenar o enum
    private Set<ClientAddressType> clientAddressTypes;
}
