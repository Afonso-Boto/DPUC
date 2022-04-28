package pi.g6.fetchercriacao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "periodo_letivo")
public class PeriodoLetivo {

    @Id
    @Column(name = "periodo", nullable = false)
    private String periodo;

    public PeriodoLetivo() {
    }

    public PeriodoLetivo(String periodo) {
        this.periodo = periodo;
    }


    //Getters and Setters
    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    @Override
    public String toString() {
        return "PeriodoLetivo{" +
                "periodo='" + periodo + '\'' +
                '}';
    }
}
