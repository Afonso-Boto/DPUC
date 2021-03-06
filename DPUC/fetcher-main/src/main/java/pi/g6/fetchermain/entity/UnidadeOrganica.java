package pi.g6.fetchermain.entity;

public class UnidadeOrganica {

    private int id;
    private String nome;
    private String sigla;
    private int utilizadores_id;

    //Getters and Setters


    public int getUtilizadores_id() {
        return utilizadores_id;
    }

    public void setUtilizadores_id(int utilizadores_id) {
        this.utilizadores_id = utilizadores_id;
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

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    @Override
    public String toString() {
        return "UnidadeOrganica{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", sigla='" + sigla + '\'' +
                '}';
    }
}
