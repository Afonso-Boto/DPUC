package pi.g6.fetchermain.entity;

import java.util.Arrays;

public class DpucUc {

    private int id;
    private boolean criacao_edicao;
    private String duracao;
    private String carga_horaria;
    private String horas_contacto;
    private String horas_trabalho;
    private String objetivos;
    private String conteudos;
    private String coerencia_conteudos;
    private String metodologias;
    private String coerencia_metodologias;
    private String bibliografia;
    private String observacoes;
    private String regime_faltas;
    private String linguas;
    private String modalidade;
    private String requisitos;
    private byte[] ficheiros;
    private String data_alteracao;
    private String pagina_publica;
    private String funcionamento;
    private String aprendizagem;
    private int estadoid;
    private int periodo_letivoid;
    private int regenteID;
    private int ucCodigo;
    private String designacao;
    private int unidade_organicaid;
    private int sigla_ac;
    private int ects;
    private String cursos;

    public DpucUc(Dpuc dpuc, Uc uc, String cursos){
        id = dpuc.getId();
        criacao_edicao = dpuc.getCriacao_edicao();
        duracao = dpuc.getDuracao();
        carga_horaria = dpuc.getCarga_horaria();
        horas_contacto = dpuc.getHoras_contacto();
        horas_trabalho = dpuc.getHoras_trabalho();
        objetivos = dpuc.getObjetivos();
        conteudos = dpuc.getConteudos();
        coerencia_conteudos = dpuc.getCoerencia_conteudos();
        metodologias = dpuc.getMetodologias();
        coerencia_metodologias = dpuc.getCoerencia_metodologias();
        bibliografia = dpuc.getBibliografia();
        observacoes =dpuc.getObservacoes() ;
        regime_faltas = dpuc.getRegime_faltas();
        linguas = dpuc.getLinguas();
        modalidade = dpuc.getModalidade();
        requisitos = dpuc.getRequisitos();
        ficheiros = dpuc.getFicheiros();
        data_alteracao = dpuc.getData_alteracao();
        pagina_publica = dpuc.getPagina_publica();
        funcionamento = dpuc.getFuncionamento();
        aprendizagem = dpuc.getAprendizagem();
        estadoid = dpuc.getEstadoid();
        periodo_letivoid = dpuc.getPeriodo_letivoid();
        regenteID = dpuc.getRegenteID();
        ucCodigo = uc.getCodigo();
        designacao = uc.getDesignacao();
        sigla_ac = uc.getSigla_ac();
        unidade_organicaid = uc.getUnidade_organicaid();
        ects = uc.getEcts();
        this.cursos = cursos;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isCriacao_edicao() {
        return criacao_edicao;
    }

    public void setCriacao_edicao(boolean criacao_edicao) {
        this.criacao_edicao = criacao_edicao;
    }

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public String getCarga_horaria() {
        return carga_horaria;
    }

    public void setCarga_horaria(String carga_horaria) {
        this.carga_horaria = carga_horaria;
    }

    public String getHoras_contacto() {
        return horas_contacto;
    }

    public void setHoras_contacto(String horas_contacto) {
        this.horas_contacto = horas_contacto;
    }

    public String getHoras_trabalho() {
        return horas_trabalho;
    }

    public void setHoras_trabalho(String horas_trabalho) {
        this.horas_trabalho = horas_trabalho;
    }

    public String getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(String objetivos) {
        this.objetivos = objetivos;
    }

    public String getConteudos() {
        return conteudos;
    }

    public void setConteudos(String conteudos) {
        this.conteudos = conteudos;
    }

    public String getCoerencia_conteudos() {
        return coerencia_conteudos;
    }

    public void setCoerencia_conteudos(String coerencia_conteudos) {
        this.coerencia_conteudos = coerencia_conteudos;
    }

    public String getMetodologias() {
        return metodologias;
    }

    public void setMetodologias(String metodologias) {
        this.metodologias = metodologias;
    }

    public String getCoerencia_metodologias() {
        return coerencia_metodologias;
    }

    public void setCoerencia_metodologias(String coerencia_metodologias) {
        this.coerencia_metodologias = coerencia_metodologias;
    }

    public String getBibliografia() {
        return bibliografia;
    }

    public void setBibliografia(String bibliografia) {
        this.bibliografia = bibliografia;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public String getRegime_faltas() {
        return regime_faltas;
    }

    public void setRegime_faltas(String regime_faltas) {
        this.regime_faltas = regime_faltas;
    }

    public String getLinguas() {
        return linguas;
    }

    public void setLinguas(String linguas) {
        this.linguas = linguas;
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    public String getRequisitos() {
        return requisitos;
    }

    public void setRequisitos(String requisitos) {
        this.requisitos = requisitos;
    }

    public byte[] getFicheiros() {
        return ficheiros;
    }

    public void setFicheiros(byte[] ficheiros) {
        this.ficheiros = ficheiros;
    }

    public String getData_alteracao() {
        return data_alteracao;
    }

    public void setData_alteracao(String data_alteracao) {
        this.data_alteracao = data_alteracao;
    }

    public String getPagina_publica() {
        return pagina_publica;
    }

    public void setPagina_publica(String pagina_publica) {
        this.pagina_publica = pagina_publica;
    }

    public String getFuncionamento() {
        return funcionamento;
    }

    public void setFuncionamento(String funcionamento) {
        this.funcionamento = funcionamento;
    }

    public String getAprendizagem() {
        return aprendizagem;
    }

    public void setAprendizagem(String aprendizagem) {
        this.aprendizagem = aprendizagem;
    }

    public int getEstadoid() {
        return estadoid;
    }

    public void setEstadoid(int estadoid) {
        this.estadoid = estadoid;
    }

    public int getPeriodo_letivoid() {
        return periodo_letivoid;
    }

    public void setPeriodo_letivoid(int periodo_letivoid) {
        this.periodo_letivoid = periodo_letivoid;
    }

    public int getRegenteID() {
        return regenteID;
    }

    public void setRegenteID(int regenteID) {
        this.regenteID = regenteID;
    }

    public int getUcCodigo() {
        return ucCodigo;
    }

    public void setUcCodigo(int ucCodigo) {
        this.ucCodigo = ucCodigo;
    }

    public String getDesignacao() {
        return designacao;
    }

    public void setDesignacao(String designacao) {
        this.designacao = designacao;
    }

    public int getSigla_ac() {
        return sigla_ac;
    }

    public void setSigla_ac(int sigla_ac) {
        this.sigla_ac = sigla_ac;
    }

    public int getUnidade_organicaid() {
        return unidade_organicaid;
    }

    public void setUnidade_organicaid(int unidade_organicaid) {
        this.unidade_organicaid = unidade_organicaid;
    }

    public int getEcts() {
        return ects;
    }

    public void setEcts(int ects) {
        this.ects = ects;
    }

    public String getCursos() {
        return cursos;
    }

    public void setCursos(String cursos) {
        this.cursos = cursos;
    }

    @Override
    public String toString() {
        return "DpucUc{" +
                "id=" + id +
                ", criacao_edicao=" + criacao_edicao +
                ", duracao='" + duracao + '\'' +
                ", carga_horaria='" + carga_horaria + '\'' +
                ", horas_contacto='" + horas_contacto + '\'' +
                ", horas_trabalho='" + horas_trabalho + '\'' +
                ", objetivos='" + objetivos + '\'' +
                ", conteudos='" + conteudos + '\'' +
                ", coerencia_conteudos='" + coerencia_conteudos + '\'' +
                ", metodologias='" + metodologias + '\'' +
                ", coerencia_metodologias='" + coerencia_metodologias + '\'' +
                ", bibliografia='" + bibliografia + '\'' +
                ", observacoes='" + observacoes + '\'' +
                ", regime_faltas='" + regime_faltas + '\'' +
                ", linguas='" + linguas + '\'' +
                ", modalidade='" + modalidade + '\'' +
                ", requisitos='" + requisitos + '\'' +
                ", ficheiros=" + Arrays.toString(ficheiros) +
                ", data_alteracao='" + data_alteracao + '\'' +
                ", pagina_publica='" + pagina_publica + '\'' +
                ", funcionamento='" + funcionamento + '\'' +
                ", aprendizagem='" + aprendizagem + '\'' +
                ", estadoid=" + estadoid +
                ", periodo_letivoid=" + periodo_letivoid +
                ", regenteID=" + regenteID +
                ", ucCodigo=" + ucCodigo +
                ", designacao='" + designacao + '\'' +
                ", sigla_ac=" + sigla_ac +
                ", unidade_organicaid=" + unidade_organicaid +
                '}';
    }
}
