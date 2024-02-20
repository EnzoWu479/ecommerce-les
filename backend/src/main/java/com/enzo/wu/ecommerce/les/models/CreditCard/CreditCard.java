package com.enzo.wu.ecommerce.les.models.CreditCard;

import com.enzo.wu.ecommerce.les.models.User.UserClient;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = CreditCard.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class CreditCard {
    public static final String TABLE_NAME = "credit_card";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crd_id", unique = true, nullable = false, length = 36)
    private Long id;

    @ManyToOne(optional = false)
    private CreditCardBrand brand;

    @Column(name = "crd_number", nullable = false, unique = true)
    private String number;

    @Column(name = "crd_cvv", nullable = false, length = 3)
    private String cvv;

    @Column(name = "crd_expiration_date", nullable = false)
    @JsonFormat(pattern = "MM/yyyy")
    private String expirationDate;

    @Column(name = "crd_holder_name", nullable = false)
    private String holderName;

    @ManyToOne
    private UserClient userClient;
}
