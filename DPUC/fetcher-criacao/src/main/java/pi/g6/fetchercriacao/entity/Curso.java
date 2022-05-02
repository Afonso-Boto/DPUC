package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "utilizadores")
public class Curso {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private UnidadeOrganica unidadeOrganica;

    @ManyToMany(mappedBy = "cursos")
    Set<Dpuc> dpucs;

    public Curso() {
    }

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

    public UnidadeOrganica getUnidadeOrganica() {
        return unidadeOrganica;
    }

    public void setUnidadeOrganica(UnidadeOrganica unidadeOrganica) {
        this.unidadeOrganica = unidadeOrganica;
    }

    public Set<Dpuc> getDpucs() {
        return dpucs;
    }

    public void setDpucs(Set<Dpuc> dpucs) {
        this.dpucs = dpucs;
    }
}
