package pi.g6.fetchercriacao.entity;

import javax.persistence.*;

@Entity
@Table(name = "controlo")
public class Controlo {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "codigo", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean codigo;

    @Column(name = "criacao_edicao", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean criacao_edicao;

    @Column(name = "designacao", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean designacao;

    @Column(name = "sigla_ac", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean sigla_ac;

    @Column(name = "duracao", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean duracao;

    @Column(name = "responsavel", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean responsavel;

    @Column(name = "carga_horaria", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean carga_horaria;

    @Column(name = "horas_contacto", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean horas_contacto;

    @Column(name = "horas_trabalho", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean horas_trabalho;

    @Column(name = "ects", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean ects;

    @Column(name = "objetivos", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean objetivos;

    @Column(name = "conteudos", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean conteudos;

    @Column(name = "coerencia_conteudos", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean coerencia_conteudos;

    @Column(name = "metodologias", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean metodologias;

    @Column(name = "coerencia_metodologias", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean coerencia_metodologias;

    @Column(name = "bibliografia", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean bibliografia;

    @Column(name = "observacoes", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean observacoes;

    @Column(name = "regime_faltas", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean regime_faltas;

    @Column(name = "linguas", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean linguas;

    @Column(name = "modalidade", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean modalidade;

    @Column(name = "requisitos", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean requisitos;

    @Column(name = "ficheiros", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean ficheiros;

    @Column(name = "data_alteracao", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean data_alteracao;

    @Column(name = "pagina_publica", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean pagina_publica;

    @Column(name = "funcionamento", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean funcionamento;

    @Column(name = "aprendizagem", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean aprendizagem;

    // FK id do tipo_utilizador
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tipo_utilizadorid", referencedColumnName = "id", insertable = false, updatable = false)
    private TipoUtilizador tipoUtilizador;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isCodigo() {
        return codigo;
    }

    public void setCodigo(boolean codigo) {
        this.codigo = codigo;
    }

    public boolean isCriacao_edicao() {
        return criacao_edicao;
    }

    public void setCriacao_edicao(boolean criacao_edicao) {
        this.criacao_edicao = criacao_edicao;
    }

    public boolean isDesignacao() {
        return designacao;
    }

    public void setDesignacao(boolean designacao) {
        this.designacao = designacao;
    }

    public boolean isSigla_ac() {
        return sigla_ac;
    }

    public void setSigla_ac(boolean sigla_ac) {
        this.sigla_ac = sigla_ac;
    }

    public boolean isDuracao() {
        return duracao;
    }

    public void setDuracao(boolean duracao) {
        this.duracao = duracao;
    }

    public boolean isResponsavel() {
        return responsavel;
    }

    public void setResponsavel(boolean responsavel) {
        this.responsavel = responsavel;
    }

    public boolean isCarga_horaria() {
        return carga_horaria;
    }

    public void setCarga_horaria(boolean carga_horaria) {
        this.carga_horaria = carga_horaria;
    }

    public boolean isHoras_contacto() {
        return horas_contacto;
    }

    public void setHoras_contacto(boolean horas_contacto) {
        this.horas_contacto = horas_contacto;
    }

    public boolean isHoras_trabalho() {
        return horas_trabalho;
    }

    public void setHoras_trabalho(boolean horas_trabalho) {
        this.horas_trabalho = horas_trabalho;
    }

    public boolean isEcts() {
        return ects;
    }

    public void setEcts(boolean ects) {
        this.ects = ects;
    }

    public boolean isObjetivos() {
        return objetivos;
    }

    public void setObjetivos(boolean objetivos) {
        this.objetivos = objetivos;
    }

    public boolean isConteudos() {
        return conteudos;
    }

    public void setConteudos(boolean conteudos) {
        this.conteudos = conteudos;
    }

    public boolean isCoerencia_conteudos() {
        return coerencia_conteudos;
    }

    public void setCoerencia_conteudos(boolean coerencia_conteudos) {
        this.coerencia_conteudos = coerencia_conteudos;
    }

    public boolean isMetodologias() {
        return metodologias;
    }

    public void setMetodologias(boolean metodologias) {
        this.metodologias = metodologias;
    }

    public boolean isCoerencia_metodologias() {
        return coerencia_metodologias;
    }

    public void setCoerencia_metodologias(boolean coerencia_metodologias) {
        this.coerencia_metodologias = coerencia_metodologias;
    }

    public boolean isBibliografia() {
        return bibliografia;
    }

    public void setBibliografia(boolean bibliografia) {
        this.bibliografia = bibliografia;
    }

    public boolean isObservacoes() {
        return observacoes;
    }

    public void setObservacoes(boolean observacoes) {
        this.observacoes = observacoes;
    }

    public boolean isRegime_faltas() {
        return regime_faltas;
    }

    public void setRegime_faltas(boolean regime_faltas) {
        this.regime_faltas = regime_faltas;
    }

    public boolean isLinguas() {
        return linguas;
    }

    public void setLinguas(boolean linguas) {
        this.linguas = linguas;
    }

    public boolean isModalidade() {
        return modalidade;
    }

    public void setModalidade(boolean modalidade) {
        this.modalidade = modalidade;
    }

    public boolean isRequisitos() {
        return requisitos;
    }

    public void setRequisitos(boolean requisitos) {
        this.requisitos = requisitos;
    }

    public boolean isFicheiros() {
        return ficheiros;
    }

    public void setFicheiros(boolean ficheiros) {
        this.ficheiros = ficheiros;
    }

    public boolean isData_alteracao() {
        return data_alteracao;
    }

    public void setData_alteracao(boolean data_alteracao) {
        this.data_alteracao = data_alteracao;
    }

    public boolean isPagina_publica() {
        return pagina_publica;
    }

    public void setPagina_publica(boolean pagina_publica) {
        this.pagina_publica = pagina_publica;
    }

    public boolean isFuncionamento() {
        return funcionamento;
    }

    public void setFuncionamento(boolean funcionamento) {
        this.funcionamento = funcionamento;
    }

    public boolean isAprendizagem() {
        return aprendizagem;
    }

    public void setAprendizagem(boolean aprendizagem) {
        this.aprendizagem = aprendizagem;
    }

    public TipoUtilizador getTipoUtilizador() {
        return tipoUtilizador;
    }

    public void setTipoUtilizador(TipoUtilizador tipoUtilizador) {
        this.tipoUtilizador = tipoUtilizador;
    }
}
