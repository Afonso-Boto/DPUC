package pi.g6.fetchercriacao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "utilizadores")
public class Curso {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @Column(name = "id_uo", nullable = false)
    private int id_uo;

    public Curso() {
    }

    public Curso(int id, String nome, int id_uo) {
        this.id = id;
        this.nome = nome;
        this.id_uo = id_uo;
    }


    // Getters and Setters

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

    public int getId_uo() {
        return id_uo;
    }

    public void setId_uo(int id_uo) {
        this.id_uo = id_uo;
    }

    @Override
    public String toString() {
        return "Utilizador{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", id_uo=" + id_uo +
                '}';
    }
}
