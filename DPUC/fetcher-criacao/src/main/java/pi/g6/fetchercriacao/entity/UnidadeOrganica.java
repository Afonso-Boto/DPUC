package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "unidade_organica")
public class UnidadeOrganica {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "sigla", nullable = false)
    private String sigla;

    // FK para utilizadores
    @OneToMany(mappedBy = "unidadeOrganica")
    private Set<Curso> cursos;

    public UnidadeOrganica() {
    }

    //Getters and Setters


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

}
