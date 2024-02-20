package com.enzo.wu.ecommerce.les.models.Address;

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
@Table(name = City.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class City {
    public static final String TABLE_NAME = "city";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cit_id")
    private Long id;

    @Column(name = "cit_name", nullable = false, length = 100)
    private String name;

    @ManyToOne
    private State state;
}
