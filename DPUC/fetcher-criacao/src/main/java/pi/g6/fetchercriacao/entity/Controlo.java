package pi.g6.fetchercriacao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "controlo")
public class Controlo {

    @Id
    @Column(name = "utilizador", nullable = false)
    private int utilizador;

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

    @Column(name = "docentes", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean docentes;

    @Column(name = "docentes_horas", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean docentes_horas;

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

    @Column(name = "id_uo", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean id_uo;

    @Column(name = "cursos", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean cursos;

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

    @Column(name = "grau", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean grau;

    @Column(name = "avaliacao", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean avaliacao;

    @Column(name = "periodo", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean periodo;

    @Column(name = "estado", nullable = false, columnDefinition = "TINYINT(1)")
    private boolean estado;


    public Controlo() {
    }

    public Controlo(int utilizador, boolean criacao_edicao, boolean designacao, boolean sigla_ac, boolean duracao, boolean responsavel, boolean carga_horaria, boolean horas_contacto, boolean docentes, boolean docentes_horas, boolean horas_trabalho, boolean ects, boolean objetivos, boolean conteudos, boolean coerencia_conteudos, boolean metodologias, boolean coerencia_metodologias, boolean bibliografia, boolean observacoes, boolean id_uo, boolean cursos, boolean regime_faltas, boolean linguas, boolean modalidade, boolean requisitos, boolean ficheiros, boolean data_alteracao, boolean pagina_publica, boolean funcionamento, boolean aprendizagem, boolean grau, boolean avaliacao, boolean periodo, boolean estado) {
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

    public boolean isDocentes() {
        return docentes;
    }

    public void setDocentes(boolean docentes) {
        this.docentes = docentes;
    }

    public boolean isDocentes_horas() {
        return docentes_horas;
    }

    public void setDocentes_horas(boolean docentes_horas) {
        this.docentes_horas = docentes_horas;
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

    public boolean isId_uo() {
        return id_uo;
    }

    public void setId_uo(boolean id_uo) {
        this.id_uo = id_uo;
    }

    public boolean isCursos() {
        return cursos;
    }

    public void setCursos(boolean cursos) {
        this.cursos = cursos;
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

    public boolean isGrau() {
        return grau;
    }

    public void setGrau(boolean grau) {
        this.grau = grau;
    }

    public boolean isAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(boolean avaliacao) {
        this.avaliacao = avaliacao;
    }

    public boolean isPeriodo() {
        return periodo;
    }

    public void setPeriodo(boolean periodo) {
        this.periodo = periodo;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Controlo{" +
                "utilizador=" + utilizador +
                ", criacao_edicao=" + criacao_edicao +
                ", designacao=" + designacao +
                ", sigla_ac=" + sigla_ac +
                ", duracao=" + duracao +
                ", responsavel=" + responsavel +
                ", carga_horaria=" + carga_horaria +
                ", horas_contacto=" + horas_contacto +
                ", docentes=" + docentes +
                ", docentes_horas=" + docentes_horas +
                ", horas_trabalho=" + horas_trabalho +
                ", ects=" + ects +
                ", objetivos=" + objetivos +
                ", conteudos=" + conteudos +
                ", coerencia_conteudos=" + coerencia_conteudos +
                ", metodologias=" + metodologias +
                ", coerencia_metodologias=" + coerencia_metodologias +
                ", bibliografia=" + bibliografia +
                ", observacoes=" + observacoes +
                ", id_uo=" + id_uo +
                ", cursos=" + cursos +
                ", regime_faltas=" + regime_faltas +
                ", linguas=" + linguas +
                ", modalidade=" + modalidade +
                ", requisitos=" + requisitos +
                ", ficheiros=" + ficheiros +
                ", data_alteracao=" + data_alteracao +
                ", pagina_publica=" + pagina_publica +
                ", funcionamento=" + funcionamento +
                ", aprendizagem=" + aprendizagem +
                ", grau=" + grau +
                ", avaliacao=" + avaliacao +
                ", periodo=" + periodo +
                ", estado=" + estado +
                '}';
    }
}
