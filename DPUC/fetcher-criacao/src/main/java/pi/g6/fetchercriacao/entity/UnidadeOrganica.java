package pi.g6.fetchercriacao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "unidade_organica")
public class UnidadeOrganica {

    @Id
    @Column(name = "cod_int", nullable = false)
    private int cod_int;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "sigla", nullable = false)
    private String sigla;

    public UnidadeOrganica() {
    }

    public UnidadeOrganica(int cod_int, String nome, String sigla) {
        this.cod_int = cod_int;
        this.nome = nome;
        this.sigla = sigla;
    }

    //Getters and Setters

    public int getCod_int() {
        return cod_int;
    }

    public void setCod_int(int cod_int) {
        this.cod_int = cod_int;
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

    @Override
    public String toString() {
        return "UnidadeOrganica{" +
                "cod_int='" + cod_int + '\'' +
                ", nome='" + nome + '\'' +
                ", sigla='" + sigla + '\'' +
                '}';
    }
}
