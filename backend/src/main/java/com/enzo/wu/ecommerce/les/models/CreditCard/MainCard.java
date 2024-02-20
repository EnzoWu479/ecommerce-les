package com.enzo.wu.ecommerce.les.models.CreditCard;

import com.enzo.wu.ecommerce.les.models.User.UserClient;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = MainCard.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class MainCard {
    public static final String TABLE_NAME = "main_card";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mcrd_id", unique = true, nullable = false, length = 36)
    private Long id;

    @OneToOne(mappedBy = "mainCard")
    private UserClient user;

    @OneToOne
    private CreditCard creditCard;
}
