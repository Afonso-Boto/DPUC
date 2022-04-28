package pi.g6.fetchercriacao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "utilziador")
public class Utilizador {

    @Id
    @Column(name = "cod_int", nullable = false)
    private int cod_int;

    @Column(name = "nome_completo", nullable = false)
    private String nome_completo;


    @Column(name = "email", nullable = false)
    private String email;


    @Column(name = "pass", nullable = false)
    private String pass;


    @Column(name = "tipo", nullable = false)
    private String tipo;


    @Column(name = "id_uo", nullable = false)
    private int id_uo;

    public Utilizador() {
    }

    public Utilizador(int cod_int, String nome_completo, String email, String pass, String tipo, int id_uo) {
        this.cod_int = cod_int;
        this.nome_completo = nome_completo;
        this.email = email;
        this.pass = pass;
        this.tipo = tipo;
        this.id_uo = id_uo;
    }


    //Getters and Setters

    public int getCod_int() {
        return cod_int;
    }

    public void setCod_int(int cod_int) {
        this.cod_int = cod_int;
    }

    public String getNome_completo() {
        return nome_completo;
    }

    public void setNome_completo(String nome_completo) {
        this.nome_completo = nome_completo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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
                "cod_int=" + cod_int +
                ", nome_completo='" + nome_completo + '\'' +
                ", email='" + email + '\'' +
                ", pass='" + pass + '\'' +
                ", tipo='" + tipo + '\'' +
                ", id_uo=" + id_uo +
                '}';
    }
}
