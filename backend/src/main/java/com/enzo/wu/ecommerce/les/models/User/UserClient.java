package com.enzo.wu.ecommerce.les.models.User;

import java.time.LocalDate;
import java.util.List;

import com.enzo.wu.ecommerce.les.models.Address.ClientAddress;
import com.enzo.wu.ecommerce.les.models.CreditCard.CreditCard;
import com.enzo.wu.ecommerce.les.models.CreditCard.MainCard;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = UserClient.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class UserClient {
    public static final String TABLE_NAME = "user_client";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_cli_id", unique = true, nullable = false, length = 36)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usr_id", nullable = false)
    private User user;

    @Column(name = "usr_cli_name", nullable = false, length = 100)
    private String name;

    @Column(name = "usr_cli_cpf", nullable = false, length = 11, unique = true)
    private String cpf;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthDate;

    @OneToMany(mappedBy = "userClient")
    private List<ClientAddress> addresses;

    @OneToMany(mappedBy = "userClient")
    private List<CreditCard> creditCards;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usr_cli_main_card_id", referencedColumnName = "mcrd_id", nullable = false)
    private MainCard mainCard;
}
