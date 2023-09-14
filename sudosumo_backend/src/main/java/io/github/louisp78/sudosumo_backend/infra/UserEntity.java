package io.github.louisp78.sudosumo_backend.infra;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, unique=true)
    private String email;

    // by default, the score is 0
    @Column(nullable = false)
    @Builder.Default
    private Integer score = 0;
}
