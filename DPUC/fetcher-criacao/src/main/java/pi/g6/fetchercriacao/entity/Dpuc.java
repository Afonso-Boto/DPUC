package pi.g6.fetchercriacao.entity;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "dpuc")
public class Dpuc {

    @Id
    @Column(name = "utilizador", nullable = false)
    private int utilizador;

    @Column(name = "criacao_edicao")
    private String criacao_edicao;

    @Column(name = "designacao")
    private String designacao;

    @Column(name = "sigla_ac")
    private String sigla_ac;

    @Column(name = "duracao")
    private String duracao;

    @Column(name = "responsavel")
    private String responsavel;

    @Column(name = "carga_horaria")
    private String carga_horaria;

    @Column(name = "horas_contacto")
    private String horas_contacto;

    @Column(name = "docentes")
    private String docentes;

    @Column(name = "docentes_horas")
    private String docentes_horas;

    @Column(name = "horas_trabalho")
    private String horas_trabalho;

    @Column(name = "ects")
    private String ects;

    @Column(name = "objetivos")
    private String objetivos;

    @Column(name = "conteudos")
    private String conteudos;

    @Column(name = "coerencia_conteudos")
    private String coerencia_conteudos;

    @Column(name = "metodologias")
    private String metodologias;

    @Column(name = "coerencia_metodologias")
    private String coerencia_metodologias;

    @Column(name = "bibliografia")
    private String bibliografia;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "id_uo")
    private int id_uo;

    @Column(name = "cursos")
    private String cursos;

    @Column(name = "regime_faltas")
    private String regime_faltas;

    @Column(name = "linguas")
    private String linguas;

    @Column(name = "modalidade")
    private String modalidade;

    @Column(name = "requisitos")
    private String requisitos;
    
    @Lob
    @Column(name = "ficheiros")
    private byte[] ficheiros;

    @Column(name = "data_alteracao")
    private String data_alteracao;

    @Column(name = "pagina_publica")
    private String pagina_publica;

    @Column(name = "funcionamento")
    private String funcionamento;

    @Column(name = "aprendizagem")
    private String aprendizagem;

    @Column(name = "grau")
    private String grau;

    @Column(name = "avaliacao")
    private String avaliacao;

    @Column(name = "periodo")
    private String periodo;

    @Column(name = "estado")
    private String estado;

    public Dpuc() {
    }

    public Dpuc(int utilizador, String criacao_edicao, String designacao, String sigla_ac, String duracao, String responsavel, String carga_horaria, String horas_contacto, String docentes, String docentes_horas, String horas_trabalho, String ects, String objetivos, String conteudos, String coerencia_conteudos, String metodologias, String coerencia_metodologias, String bibliografia, String observacoes, int id_uo, String cursos, String regime_faltas, String linguas, String modalidade, String requisitos, byte[] ficheiros, String data_alteracao, String pagina_publica, String funcionamento, String aprendizagem, String grau, String avaliacao, String periodo, String estado) {
        this.utilizador = utilizador;
        this.criacao_edicao = criacao_edicao;
        this.designacao = designacao;
        this.sigla_ac = sigla_ac;
        this.duracao = duracao;
        this.responsavel = responsavel;
        this.carga_horaria = carga_horaria;
        this.horas_contacto = horas_contacto;
        this.docentes = docentes;
        this.docentes_horas = docentes_horas;
        this.horas_trabalho = horas_trabalho;
        this.ects = ects;
        this.objetivos = objetivos;
        this.conteudos = conteudos;
        this.coerencia_conteudos = coerencia_conteudos;
        this.metodologias = metodologias;
        this.coerencia_metodologias = coerencia_metodologias;
        this.bibliografia = bibliografia;
        this.observacoes = observacoes;
        this.id_uo = id_uo;
        this.cursos = cursos;
        this.regime_faltas = regime_faltas;
        this.linguas = linguas;
        this.modalidade = modalidade;
        this.requisitos = requisitos;
        this.ficheiros = ficheiros;
        this.data_alteracao = data_alteracao;
        this.pagina_publica = pagina_publica;
        this.funcionamento = funcionamento;
        this.aprendizagem = aprendizagem;
        this.grau = grau;
        this.avaliacao = avaliacao;
        this.periodo = periodo;
        this.estado = estado;
    }

    //Getters and Setters
    public int getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(int utilizador) {
        this.utilizador = utilizador;
    }

    public String getCriacao_edicao() {
        return criacao_edicao;
    }

    public void setCriacao_edicao(String criacao_edicao) {
        this.criacao_edicao = criacao_edicao;
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

    public String getDuracao() {
        return duracao;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
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

    public String getDocentes() {
        return docentes;
    }

    public void setDocentes(String docentes) {
        this.docentes = docentes;
    }

    public String getDocentes_horas() {
        return docentes_horas;
    }

    public void setDocentes_horas(String docentes_horas) {
        this.docentes_horas = docentes_horas;
    }

    public String getHoras_trabalho() {
        return horas_trabalho;
    }

    public void setHoras_trabalho(String horas_trabalho) {
        this.horas_trabalho = horas_trabalho;
    }

    public String getEcts() {
        return ects;
    }

    public void setEcts(String ects) {
        this.ects = ects;
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

    public int getId_uo() {
        return id_uo;
    }

    public void setId_uo(int id_uo) {
        this.id_uo = id_uo;
    }

    public String getCursos() {
        return cursos;
    }

    public void setCursos(String cursos) {
        this.cursos = cursos;
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

    public String getGrau() {
        return grau;
    }

    public void setGrau(String grau) {
        this.grau = grau;
    }

    public String getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Dpuc{" +
                "utilizador=" + utilizador +
                ", criacao_edicao='" + criacao_edicao + '\'' +
                ", designacao='" + designacao + '\'' +
                ", sigla_ac='" + sigla_ac + '\'' +
                ", duracao='" + duracao + '\'' +
                ", responsavel='" + responsavel + '\'' +
                ", carga_horaria='" + carga_horaria + '\'' +
                ", horas_contacto='" + horas_contacto + '\'' +
                ", docentes='" + docentes + '\'' +
                ", docentes_horas='" + docentes_horas + '\'' +
                ", horas_trabalho='" + horas_trabalho + '\'' +
                ", ects='" + ects + '\'' +
                ", objetivos='" + objetivos + '\'' +
                ", conteudos='" + conteudos + '\'' +
                ", coerencia_conteudos='" + coerencia_conteudos + '\'' +
                ", metodologias='" + metodologias + '\'' +
                ", coerencia_metodologias='" + coerencia_metodologias + '\'' +
                ", bibliografia='" + bibliografia + '\'' +
                ", observacoes='" + observacoes + '\'' +
                ", id_uo=" + id_uo +
                ", cursos='" + cursos + '\'' +
                ", regime_faltas='" + regime_faltas + '\'' +
                ", linguas='" + linguas + '\'' +
                ", modalidade='" + modalidade + '\'' +
                ", requisitos='" + requisitos + '\'' +
                ", ficheiros=" + Arrays.toString(ficheiros) +
                ", data_alteracao='" + data_alteracao + '\'' +
                ", pagina_publica='" + pagina_publica + '\'' +
                ", funcionamento='" + funcionamento + '\'' +
                ", aprendizagem='" + aprendizagem + '\'' +
                ", grau='" + grau + '\'' +
                ", avaliacao='" + avaliacao + '\'' +
                ", periodo='" + periodo + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}
