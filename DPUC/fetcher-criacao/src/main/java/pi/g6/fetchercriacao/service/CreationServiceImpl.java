package pi.g6.fetchercriacao.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Service;
import pi.g6.fetchercriacao.entity.*;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.*;

@Service
@Log4j2
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
    public List<DpucUc> getDPUCs() {
        String query = "SELECT * FROM dpuc";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        List<DpucUc> result = new ArrayList<>();

        List<Dpuc> dpucList = new ArrayList<>();

        for (Map<String, Object> row : rows){
            Dpuc dpuc = new Dpuc();
            try {
                dpuc.setId((int) ((row.get("id") != null) ?  row.get("id") : -1));


                if (row.get("criacao_edicao") == null)
                    throw new Exception();
                dpuc.setCriacao_edicao((boolean) row.get("criacao_edicao"));

                dpuc.setDuracao((String) ((row.get("duracao") != null) ? row.get("duracao") : null));
                dpuc.setCarga_horaria((String) ((row.get("carga_horaria") != null) ? row.get("carga_horaria") : null));

                dpuc.setHoras_contacto((String) ((row.get("horas_contacto") != null) ? row.get("horas_contacto") : null));
                dpuc.setHoras_trabalho((String) ((row.get("horas_trabalho") != null) ? row.get("horas_trabalho") : null));
                dpuc.setObjetivos((String) ((row.get("objetivos") != null) ? row.get("objetivos") : null));
                dpuc.setConteudos((String) ((row.get("conteudos") != null) ? row.get("conteudos") : null));
                dpuc.setCoerencia_conteudos((String) ((row.get("coerencia_conteudos") != null) ? row.get("coerencia_conteudos") : null));
                dpuc.setMetodologias((String) ((row.get("metodologias") != null) ? row.get("metodologias") : null));
                dpuc.setCoerencia_metodologias((String) ((row.get("coerencia_metodologia") != null) ? row.get("coerencia_metodologia") : null));
                dpuc.setBibliografia((String) ((row.get("bibliografia") != null) ? row.get("bibliografia") : null));
                dpuc.setObservacoes((String) ((row.get("observacoes") != null) ? row.get("observacoes") : null));
                dpuc.setRegime_faltas((String) ((row.get("regime_faltas") != null) ? row.get("regime_faltas") : null));
                dpuc.setLinguas((String) ((row.get("linguas") != null) ? row.get("linguas") : null));
                dpuc.setModalidade((String) ((row.get("modalidade") != null) ? row.get("modalidade") : null));
                dpuc.setRequisitos((String) ((row.get("requisitos") != null) ? row.get("requisitos") : null));
                dpuc.setFicheiros((byte[]) ((row.get("ficheiros") != null) ? row.get("ficheiros") : null));
                dpuc.setData_alteracao((String) ((row.get("data_alteracao") != null) ? row.get("data_alteracao") : null));
                dpuc.setPagina_publica((String) ((row.get("pagina_publica") != null) ? row.get("pagina_publica") : null));
                dpuc.setFuncionamento((String) ((row.get("funcionamento") != null) ? row.get("funcionamento") : null));
                dpuc.setAprendizagem((String) ((row.get("aprendizagem") != null) ? row.get("aprendizagem") : null));
                dpuc.setEstadoid((int) ((row.get("estadoid") != null) ? row.get("estadoid") : -1));
                dpuc.setPeriodo_letivoid((int) ((row.get("periodo_letivoid") != null) ? row.get("periodo_letivoid") : -1));
                dpuc.setUcID((int) ((row.get("UCid") != null) ? row.get("UCid") : -1));
                dpuc.setRegenteID((int) ((row.get("utilizadoresid") != null) ? row.get("utilizadoresid") : -1));

                if (dpuc.getId() == -1 || dpuc.getEstadoid() == -1 || dpuc.getPeriodo_letivoid() == -1 || dpuc.getUcID() == -1 || dpuc.getRegenteID() == -1){
                    log.info("DPUCCC" + dpuc.getId());
                    log.info("ESTADO" + dpuc.getEstadoid());
                    log.info("PERIODO" + dpuc.getPeriodo_letivoid());
                    log.info("UC_IDDD" + dpuc.getUcID());
                    log.info("REGENTE" + dpuc.getRegenteID());

                    throw new Exception();
                }


            }catch (Exception e){
                log.info(e.getMessage());
                continue;
            }
            log.info("DPUC has ID HYEEEE");
            //log.info(dpuc);

            dpucList.add(dpuc);

        }
        //Check this code
        //Check this code
        //Check this code
        //Check this code
        //Check this code
        //Check this code
        //Check this code
        //Check this code

        query = "SELECT * FROM UC";
        rows = getJdbcTemplate().queryForList(query);
        Map<Integer, Uc> ucMap = new HashMap<>();

        for (Map<String, Object> row : rows) {
            Uc uc = new Uc();
            uc.setId((int) row.get("id"));
            uc.setDesignacao((String) row.get("designacao"));
            if(row.get("codigo") != null)
                uc.setCodigo(Integer.parseInt((String) row.get("codigo")));
            uc.setUnidade_organicaid((int) row.get("unidade_organicaid"));
            if(row.get("ACid") != null)
                uc.setSigla_ac((int) row.get("ACid"));
            ucMap.put(uc.getId(), uc);
        }

        for(Dpuc dpuc: dpucList){
            result.add(new DpucUc(dpuc, ucMap.get(dpuc.getUcID())));
        }

        return result;
    }

    @Override
    public DpucUc getDPUC(int id) {
        String query = "SELECT * FROM dpuc WHERE id="+id;
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        if(rows == null || rows.isEmpty())
            return null;

        List<Dpuc> dpucList = new ArrayList<>();

        for (Map<String, Object> row : rows){
            Dpuc dpuc = new Dpuc();
            try {
                dpuc.setId((int) ((row.get("id") != null) ?  row.get("id") : -1));


                if (row.get("criacao_edicao") == null)
                    throw new Exception();
                dpuc.setCriacao_edicao((boolean) row.get("criacao_edicao"));

                dpuc.setDuracao((String) ((row.get("duracao") != null) ? row.get("duracao") : null));
                dpuc.setCarga_horaria((String) ((row.get("carga_horaria") != null) ? row.get("carga_horaria") : null));

                dpuc.setHoras_contacto((String) ((row.get("horas_contacto") != null) ? row.get("horas_contacto") : null));
                dpuc.setHoras_trabalho((String) ((row.get("horas_trabalho") != null) ? row.get("horas_trabalho") : null));
                dpuc.setObjetivos((String) ((row.get("objetivos") != null) ? row.get("objetivos") : null));
                dpuc.setConteudos((String) ((row.get("conteudos") != null) ? row.get("conteudos") : null));
                dpuc.setCoerencia_conteudos((String) ((row.get("coerencia_conteudos") != null) ? row.get("coerencia_conteudos") : null));
                dpuc.setMetodologias((String) ((row.get("metodologias") != null) ? row.get("metodologias") : null));
                dpuc.setCoerencia_metodologias((String) ((row.get("coerencia_metodologia") != null) ? row.get("coerencia_metodologia") : null));
                dpuc.setBibliografia((String) ((row.get("bibliografia") != null) ? row.get("bibliografia") : null));
                dpuc.setObservacoes((String) ((row.get("observacoes") != null) ? row.get("observacoes") : null));
                dpuc.setRegime_faltas((String) ((row.get("regime_faltas") != null) ? row.get("regime_faltas") : null));
                dpuc.setLinguas((String) ((row.get("linguas") != null) ? row.get("linguas") : null));
                dpuc.setModalidade((String) ((row.get("modalidade") != null) ? row.get("modalidade") : null));
                dpuc.setRequisitos((String) ((row.get("requisitos") != null) ? row.get("requisitos") : null));
                dpuc.setFicheiros((byte[]) ((row.get("ficheiros") != null) ? row.get("ficheiros") : null));
                dpuc.setData_alteracao((String) ((row.get("data_alteracao") != null) ? row.get("data_alteracao") : null));
                dpuc.setPagina_publica((String) ((row.get("pagina_publica") != null) ? row.get("pagina_publica") : null));
                dpuc.setFuncionamento((String) ((row.get("funcionamento") != null) ? row.get("funcionamento") : null));
                dpuc.setAprendizagem((String) ((row.get("aprendizagem") != null) ? row.get("aprendizagem") : null));
                dpuc.setEstadoid((int) ((row.get("estadoid") != null) ? row.get("estadoid") : -1));
                dpuc.setPeriodo_letivoid((int) ((row.get("periodo_letivoid") != null) ? row.get("periodo_letivoid") : -1));
                dpuc.setUcID((int) ((row.get("UCid") != null) ? row.get("UCid") : -1));
                dpuc.setRegenteID((int) ((row.get("utilizadoresid") != null) ? row.get("utilizadoresid") : -1));

                if (dpuc.getId() == -1 || dpuc.getEstadoid() == -1 || dpuc.getPeriodo_letivoid() == -1 || dpuc.getUcID() == -1 || dpuc.getRegenteID() == -1){
                    log.info("DPUCCC" + dpuc.getId());
                    log.info("ESTADO" + dpuc.getEstadoid());
                    log.info("PERIODO" + dpuc.getPeriodo_letivoid());
                    log.info("UC_IDDD" + dpuc.getUcID());
                    log.info("REGENTE" + dpuc.getRegenteID());

                    throw new Exception();
                }


            }catch (Exception e){
                log.info(e.getMessage());
                continue;
            }
            log.info("DPUC has ID HYEEEE");
            log.info(dpuc);

            dpucList.add(dpuc);
            break;
        }


        query = "SELECT * FROM UC WHERE id="+dpucList.get(0).getUcID();
        rows = getJdbcTemplate().queryForList(query);
        List<Uc> ucList = new ArrayList<>();

        for (Map<String, Object> row : rows) {
            Uc uc = new Uc();
            uc.setId((int) row.get("id"));
            uc.setDesignacao((String) row.get("designacao"));
            if(row.get("codigo") != null)
                uc.setCodigo(Integer.parseInt((String) row.get("codigo")));
            uc.setUnidade_organicaid((int) row.get("unidade_organicaid"));
            if(row.get("ACid") != null)
                uc.setSigla_ac((int) row.get("ACid"));
            ucList.add(uc);
            break;
        }

        return new DpucUc(dpucList.get(0), ucList.get(0));
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
            uo.setUtilizadores_id((int) row.get("utilizadoresid"));

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
            curso.setUtilizadores_id((int) row.get("utilizadoresid"));

            result.add(curso);
        }

        return result;
    }

    @Override
    public List<Curso> getCursos(String UO) { // pode ser id
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
        Set<String> idiomas = new HashSet<>();
        String query = "SELECT * FROM dpuc";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

        for (Map<String, Object> row : rows){
            idiomas.add((String) row.get("linguas"));
        }

        return idiomas.stream().toList();
    }

    @Override
    public List<Utilizadores> getDocentes() {
        String query = "SELECT * FROM utilizadores WHERE tipo_utilizadorid=2";

        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
        List<Utilizadores> result = new ArrayList<>();
        for (Map<String, Object> row : rows) {

            Utilizadores docente = new Utilizadores();
            docente.setId((int) row.get("id"));
            docente.setNome((String) row.get("nome"));
            docente.setEmail((String) row.get("email"));
            docente.setTipo_utilizadorid((int) row.get("tipo_utilizadorid"));

            result.add(docente);

        }

        return result;
    }

    @Override
    public List<AreaCientifica> getAreasCientificas() {
        String query = "SELECT * FROM AC";

        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
        List<AreaCientifica> result = new ArrayList<>();
        for (Map<String, Object> row : rows) {

            AreaCientifica ac = new AreaCientifica();
            ac.setId((int) row.get("id"));
            if(row.get("designacao") != null)
                ac.setDesignacao((String) row.get("designacao"));
            if(row.get("sigla") != null)
                ac.setSigla((String) row.get("sigla"));

            result.add(ac);
        }

        return result;
    }

}
