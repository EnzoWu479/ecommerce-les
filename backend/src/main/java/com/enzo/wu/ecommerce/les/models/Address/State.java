package com.enzo.wu.ecommerce.les.models.Address;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = State.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class State {
    public static final String TABLE_NAME = "state";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sta_id")
    private Long id;

    @Column(name = "sta_name", nullable = false, length = 100)
    private String name;

    @Column(name = "sta_uf", nullable = false, length = 2)
    private String uf;

    @OneToMany(mappedBy = "state")
    private List<City> cities;
}
