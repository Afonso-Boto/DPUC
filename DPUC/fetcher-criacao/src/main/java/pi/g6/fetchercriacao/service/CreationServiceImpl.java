package pi.g6.fetchercriacao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Service;
import pi.g6.fetchercriacao.entity.*;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CreationServiceImpl extends JdbcDaoSupport implements CreationService{
    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public List<Estado> getEstados() {
        String query = "SELECT * FROM estado";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<Estado> result = new ArrayList<Estado>();
        for (Map<String, Object> row : rows) {
            Estado estado = new Estado();
            estado.setId((int) row.get("id"));
            estado.setNome((String) row.get("nome"));
            estado.setDescricao((String) row.get("descricao"));

            result.add(estado);
        }

        return result;
    }

    @Override
    public List<PeriodoLetivo> getPeriodos() {
        String query = "SELECT * FROM periodo_letivo";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<PeriodoLetivo> result = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            PeriodoLetivo periodoLetivo = new PeriodoLetivo();
            periodoLetivo.setId((int) row.get("id"));
            periodoLetivo.setPeriodo((String) row.get("periodo"));

            result.add(periodoLetivo);
        }

        return result;
    }

    @Override
    public List<Dpuc> getDPUCs() {
        String query = "SELECT * FROM dpuc";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<Dpuc> result = new ArrayList<>();

        for (Map<String, Object> row : rows){
            Dpuc dpuc = new Dpuc();
            dpuc.setId((int) row.get("id"));
            dpuc.setCriacao_edicao((boolean) row.get("criacao_edicao"));
            dpuc.setCodigo((String) row.get("codigo"));
            dpuc.setDesignacao((String) row.get("designacao"));
            dpuc.setSigla_ac((String) row.get("sigla_ac"));
            dpuc.setDuracao((String) row.get("duracao"));
            dpuc.setCarga_horaria((String) row.get("carga_horaria"));
            dpuc.setHoras_contacto((int) row.get("horas_contacto")); //deveria ser int como tambem na BD
            dpuc.setHoras_trabalho((int) row.get("horas_trabalho")); //deveria ser int como na BD
            dpuc.setEcts((int) row.get("ects")); //deveria ser int como na BD
            dpuc.setObjetivos((String) row.get("objetivos"));
            dpuc.setConteudos((String) row.get("conteudos"));
            dpuc.setCoerencia_conteudos((String) row.get("coerencia_conteudos"));
            dpuc.setMetodologias((String) row.get("metodologias"));
            dpuc.setCoerencia_metodologias((String) row.get("coerencia_metodologia"));
            dpuc.setBibliografia((String) row.get("bibliografia"));
            dpuc.setObservacoes((String) row.get("observacoes"));
            dpuc.setRegime_faltas((String) row.get("regime_faltas"));
            dpuc.setLinguas((String) row.get("linguas"));
            dpuc.setModalidade((String) row.get("modalidade"));
            dpuc.setRequisitos((String) row.get("requisitos"));
            dpuc.setFicheiros((byte[]) row.get("ficheiros"));
            dpuc.setData_alteracao((String) row.get("data_alteracao"));
            dpuc.setPagina_publica((String) row.get("pagina_publica"));
            dpuc.setFuncionamento((String) row.get("funcionamento"));
            dpuc.setAprendizagem((String) row.get("aprendizagem"));
            dpuc.setEstadoid((int) row.get("estado_id"));
            dpuc.setPeriodo_letivoid((int) row.get("periodo_letivoid"));

            result.add(dpuc);

        }
        return result;
    }

    @Override
    public List<UnidadeOrganica> getUOs() {
        String query = "SELECT * FROM unidade_organica";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<UnidadeOrganica> result = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            UnidadeOrganica uo = new UnidadeOrganica();
            uo.setId((int) row.get("id"));
            uo.setNome((String) row.get("nome"));
            uo.setSigla((String) row.get("sigla"));

            result.add(uo);
        }

        return result;
    }

    @Override
    public List<Curso> getCursos() {
        String query = "SELECT * FROM curso";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<Curso> result = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            Curso curso = new Curso();
            curso.setId((int) row.get("id"));
            curso.setNome((String) row.get("nome"));
            curso.setUnidade_organicaid((int) row.get("unidade_organicaid"));

            result.add(curso);
        }

        return result;
    }

    @Override
    public List<Curso> getCursos(String UO) {
        String query = String.format("SELECT c.id, c.nome, c.unidade_organicaid from (unidade_organica JOIN curso c on unidade_organica.id = c.unidade_organicaid) where unidade_organica.sigla=\'%s\'", UO);

        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<Curso> result = new ArrayList<>();

        for (Map<String, Object> row : rows) {

            Curso curso = new Curso();
            curso.setId((int) row.get("id"));
            curso.setNome((String) row.get("nome"));
            curso.setUnidade_organicaid((int) row.get("unidade_organicaid"));

            result.add(curso);

        }

        return result;
    }

    @Override
    public List<String> getIdiomas() {
        return null;
    }

    @Override
    public List<Utilizadores> getDocente(String UO) {
        return null;
    }

    @Override
    public List<Dpuc> getUltimaVersao(int uc) {
        return null;
    }

    @Override
    public List<Dpuc> getUltimasVersoes() {
        return null;
    }

    @Override
    public List<Dpuc> getDpucEmAprovacao() {
        return null;
    }
}
