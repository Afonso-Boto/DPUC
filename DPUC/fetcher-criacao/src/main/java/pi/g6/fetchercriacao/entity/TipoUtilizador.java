package pi.g6.fetchercriacao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tipo_utilizador")
public class TipoUtilizador {

    @Id
    @Column(name = "id", nullable = false)
    private String tipo;

    public TipoUtilizador() {
    }

    public TipoUtilizador(String tipo) {
        this.tipo = tipo;
    }

    //Getters and Setters
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "TipoUtilizador{" +
                "tipo='" + tipo + '\'' +
                '}';
    }
}
