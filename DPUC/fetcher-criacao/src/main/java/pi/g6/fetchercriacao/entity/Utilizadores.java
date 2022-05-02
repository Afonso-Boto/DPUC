package pi.g6.fetchercriacao.entity;

import javax.persistence.*;

@Entity
@Table(name = "utilizadores")
public class Utilizadores {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "nome", nullable = false)
    private String nome;


    @Column(name = "email", nullable = false)
    private String email;


    @Column(name = "password", nullable = false)
    private String password;


    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private TipoUtilizador tipoUtilizador;

    public Utilizadores() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TipoUtilizador getTipoUtilizador() {
        return tipoUtilizador;
    }

    public void setTipoUtilizador(TipoUtilizador tipoUtilizador) {
        this.tipoUtilizador = tipoUtilizador;
    }
}
