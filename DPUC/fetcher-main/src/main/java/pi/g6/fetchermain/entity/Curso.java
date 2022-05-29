package pi.g6.fetchermain.entity;

public class Curso {
    private int id;
    private String nome;
    private int unidade_organicaid;
    private int utilizadores_id;


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

    public int getUtilizadores_id() {
        return utilizadores_id;
    }

    public void setUtilizadores_id(int utilizadores_id) {
        this.utilizadores_id = utilizadores_id;
    }

    public int getUnidade_organicaid() {
        return unidade_organicaid;
    }

    public void setUnidade_organicaid(int unidade_organicaid) {
        this.unidade_organicaid = unidade_organicaid;
    }
}
