package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "periodo_letivo")
public class PeriodoLetivo {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "periodo")
    private String periodo;

    @OneToMany(mappedBy = "periodoLetivo")
    private Set<Dpuc> dpucs;

    public PeriodoLetivo() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public Set<Dpuc> getDpucs() {
        return dpucs;
    }

    public void setDpucs(Set<Dpuc> dpucs) {
        this.dpucs = dpucs;
    }
}
