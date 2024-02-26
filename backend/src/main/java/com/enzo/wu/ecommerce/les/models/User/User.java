package com.enzo.wu.ecommerce.les.models.User;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class User {
    public static final String TABLE_NAME = "user_table";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_id", unique = true, nullable = false, length = 36)
    private Long id;

    @Column(name = "usr_name", nullable = false, length = 100)
    private String email;

    @Column(name = "usr_password", nullable = false, length = 100)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @CollectionTable(name = "user_roles")
    @Column(name = "usr_role", nullable = false)
    private Set<Integer> roles = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = true)
    private UserClient userClient;


    public Set<UserRoles> getRoles() {
        Set<UserRoles> roles = new HashSet<>();
        for (Integer role : this.roles) {
            roles.add(UserRoles.toEnum(role));
        }
        return roles;
    }
}
