package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tipo_utilizador")
public class TipoUtilizador {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "codigo")
    private String codigo;

    // FK para o controlo
    @OneToOne(mappedBy = "tipoUtilizador")
    private Controlo controlo;

    // FK para utilizadores
    @OneToMany(mappedBy = "tipoUtilizador")
    private Set<Utilizadores> utilizadores;

    public TipoUtilizador() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Controlo getControlo() {
        return controlo;
    }

    public void setControlo(Controlo controlo) {
        this.controlo = controlo;
    }
}
