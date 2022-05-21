package pi.g6.fetchercriacao.entity;

public class Uc {

    private int id;
    private int codigo;
    private String designacao;
    private String sigla_ac;
    private int unidade_organicaid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getDesignacao() {
        return designacao;
    }

    public void setDesignacao(String designacao) {
        this.designacao = designacao;
    }

    public String getSigla_ac() {
        return sigla_ac;
    }

    public void setSigla_ac(String sigla_ac) {
        this.sigla_ac = sigla_ac;
    }

    public int getUnidade_organicaid() {
        return unidade_organicaid;
    }

    public void setUnidade_organicaid(int unidade_organicaid) {
        this.unidade_organicaid = unidade_organicaid;
    }
}
