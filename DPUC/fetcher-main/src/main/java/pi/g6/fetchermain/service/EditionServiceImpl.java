package pi.g6.fetchermain.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import pi.g6.fetchermain.entity.Dpuc;
import pi.g6.fetchermain.entity.DpucUc;
import pi.g6.fetchermain.entity.Uc;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EditionServiceImpl extends JdbcDaoSupport implements EditionService {
    @Autowired
    DataSource dataSource;

    @Autowired
    CreationManipulationService creationManipulationService;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public HttpStatus setRegente(int dpucid, int regenteId) {
        try{
            String sql = "UPDATE dpuc SET utilizadoresid = ? WHERE id = ?";
            getJdbcTemplate().update(sql, regenteId, dpucid);

        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public ResponseEntity<List<DpucUc>> getAllDpucs(int ucid) {
        List<DpucUc> result;

        try {
            String query = "SELECT * FROM dpuc WHERE ucid = " + ucid;
            List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);

            result = new ArrayList<>();

            List<Dpuc> dpucList = new ArrayList<>();

            for (Map<String, Object> row : rows) {
                Dpuc dpuc = new Dpuc();
                try {
                    dpuc.setId((int) ((row.get("id") != null) ? row.get("id") : -1));


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

                    if (dpuc.getId() == -1 || dpuc.getEstadoid() == -1 || dpuc.getPeriodo_letivoid() == -1 || dpuc.getUcID() == -1 || dpuc.getRegenteID() == -1) {
                        throw new Exception();
                    }

                } catch (Exception e) {
                    continue;
                }
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

            query = "SELECT * FROM UC WHERE id = " + ucid;
            rows = getJdbcTemplate().queryForList(query);
            Map<Integer, Uc> ucMap = new HashMap<>();
            Map<Integer, String> ucCursos = new HashMap<>();

            for (Map<String, Object> row : rows) {
                Uc uc = new Uc();
                uc.setId((int) row.get("id"));
                uc.setDesignacao((String) row.get("designacao"));
                uc.setUnidade_organicaid((int) row.get("unidade_organicaid"));
                if (row.get("codigo") != null)
                    uc.setCodigo(Integer.parseInt((String) row.get("codigo")));
                if (row.get("ACid") != null)
                    uc.setSigla_ac((int) row.get("ACid"));
                if (row.get("ects") != null)
                    uc.setEcts((int) row.get("ects"));
                ucMap.put(uc.getId(), uc);

                // Obtain cursos
                query = "SELECT * FROM curso_UC WHERE UCid=" + uc.getId();
                String cursos = "";
                List<Map<String, Object>> cursosRow = getJdbcTemplate().queryForList(query);
                for (Map<String, Object> r : cursosRow) {
                    if (r.get("cursoid") != null)
                        cursos += (String) r.get("cursoid") + "$";
                }
                if (cursos.isEmpty())
                    cursos = null;
                ucCursos.put(uc.getId(), cursos);
            }

            for (Dpuc dpuc : dpucList) {
                result.add(new DpucUc(dpuc, ucMap.get(dpuc.getUcID()), ucCursos.get(dpuc.getUcID())));
            }

        } catch (Exception e) {
            logger.warn(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    public HttpStatus iniciarEdicao() {
        return HttpStatus.OK;
    }

    @Override
    public ResponseEntity<Integer> definicaoRegente(int dpucid, int regenteId) {
        int new_dpucid = 0;
        LocalDate date = LocalDate.now();

        try{
            // Criar novo dpuc com informação do antigo
            final String sql = String.format("INSERT INTO dpuc(criacao_edicao, duracao, carga_horaria, horas_contacto, horas_trabalho, objetivos, conteudos, coerencia_conteudos, metodologias, coerencia_metodologia, bibliografia, observacoes, regime_faltas, linguas, modalidade, requisitos, ficheiros, data_alteracao, pagina_publica, funcionamento, aprendizagem, estadoid, periodo_letivoid, UCid, utilizadoresid) select criacao_edicao, duracao, carga_horaria, horas_contacto, horas_trabalho, objetivos, conteudos, coerencia_conteudos, metodologias, coerencia_metodologia, bibliografia, observacoes, regime_faltas, linguas, modalidade, requisitos, ficheiros, data_alteracao, pagina_publica, funcionamento, aprendizagem, estadoid, periodo_letivoid, UCid, utilizadoresid FROM dpuc WHERE id = %d", dpucid);
            KeyHolder keyHolder = new GeneratedKeyHolder();
            getJdbcTemplate().update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql,
                        Statement.RETURN_GENERATED_KEYS);

                return ps;
            }, keyHolder);
            new_dpucid = keyHolder.getKey().intValue();

            // Update estado para E2 - Em edição (8 na tabela de estados)
            String sql2 = "UPDATE dpuc SET criacao_edicao=?, data_alteracao=?, utilizadoresid=?, estadoid=? WHERE id = ?";
            getJdbcTemplate().update(sql2, 1, date.toString(), regenteId, 8, new_dpucid);

        }catch (Exception e){
            logger.warn(e.getMessage());
            return new ResponseEntity<>(new_dpucid, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new_dpucid, HttpStatus.OK);
    }

    @Override
    public HttpStatus emEdicao(int dpucid, JSONObject dpuc, boolean finished) {
        try{
            if (finished){
                // Update estado para E3 - Em edição (9 na tabela de estados)
                String sql = "UPDATE dpuc SET estadoid=? WHERE id = ?";
                getJdbcTemplate().update(sql, 9, dpucid);
            }else{
                creationManipulationService.editarDpuc(dpuc, dpucid);
            }

        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus emAprovacao(int dpucid, boolean aprovado) {
        try{
            String sql = "UPDATE dpuc SET estadoid=? WHERE id = ?";

            if (aprovado){
                // Update estado para E5 - Em aprovação (10 na tabela de estados)
                getJdbcTemplate().update(sql, 10, dpucid);
            }else{
                // Update estado para E2 - Em edição (8 na tabela de estados)
                getJdbcTemplate().update(sql, 8, dpucid);
            }
        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }
}
