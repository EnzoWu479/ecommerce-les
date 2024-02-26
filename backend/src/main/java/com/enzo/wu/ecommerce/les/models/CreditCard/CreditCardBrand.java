package com.enzo.wu.ecommerce.les.models.CreditCard;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = CreditCardBrand.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class CreditCardBrand {
    public static final String TABLE_NAME = "credit_card_brand";

    @Id
    @Column(name = "brand_id", nullable = false)
    private Long id;

    @Column(name = "brand_name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "brand")
    private List<CreditCard> creditCard;
}
