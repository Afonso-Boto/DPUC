package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "estado")
public class Estado {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "estado")
    private Set<Dpuc> dpucs;

    public Estado() {
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Dpuc> getDpucs() {
        return dpucs;
    }

    public void setDpucs(Set<Dpuc> dpucs) {
        this.dpucs = dpucs;
    }
}
