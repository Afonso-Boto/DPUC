package pi.g6.fetchercriacao.service;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Repository
@Log4j2
public class ManipulationServiceImpl extends JdbcDaoSupport implements ManipulationService{
    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }


    @Override
    public HttpStatus aprovarDpuc(String designacao, String codigo) {
        String sql = "UPDATE uc SET codigo=? where designacao=?";
        getJdbcTemplate().update(sql, codigo, designacao);

        // Dpuc id
        String sql2 = "SELECT d.id FROM (uc JOIN dpuc d ON uc.id = d.UCid) WHERE uc.designacao = \'%s\'".formatted(designacao);
        int dpucid = (int) getJdbcTemplate().queryForList(sql2).get(0).get("id");

        // Update Dpuc estado para C4  "Em Aprovação"
        String sql3 = "UPDATE dpuc SET estadoid=? WHERE id=?";
        getJdbcTemplate().update(sql3, 4, dpucid);

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus desativarDpuc(String designacao) {
        // Dpuc id
        String sql2 = "SELECT d.id FROM (uc JOIN dpuc d ON uc.id = d.UCid) WHERE uc.designacao = \'%s\'".formatted(designacao);
        int dpucid = (int) getJdbcTemplate().queryForList(sql2).get(0).get("id");

        // Update Dpuc estado para C6 "Desativada"
        String sql3 = "UPDATE dpuc SET estadoid=? WHERE id=?";
        getJdbcTemplate().update(sql3, 6, dpucid);

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus editarDpuc(JSONObject dpuc, String designacao) {
        // Dpuc id
        String sql = "SELECT d.id FROM (uc JOIN dpuc d ON uc.id = d.UCid) WHERE uc.designacao = \'%s\'".formatted(designacao);
        int dpucid = (int) getJdbcTemplate().queryForList(sql).get(0).get("id");

        // Update dpuc
        String sql2 = "UPDATE dpuc SET duracao=?, carga_horaria=?, horas_contacto=?, horas_trabalho=?, objetivos=?, conteudos=?, coerencia_conteudos=?, metodologias=?, coerencia_metodologia=?, bibliografia=?, observacoes=?, regime_faltas=?, linguas=?, modalidade=?, requisitos=?, ficheiros=?, data_alteracao=?, pagina_publica=?, funcionamento=?, aprendizagem=? WHERE id=?";
        getJdbcTemplate().update(sql2, dpuc.getString("duracao"), dpuc.getString("carga_horaria"), dpuc.get("horas_contacto"), dpuc.get("horas_trabalho"), dpuc.getString("objetivos"), dpuc.getString("conteudos"), dpuc.getString("coerencia_conteudos"), dpuc.getString("metodologias"), dpuc.getString("coerencia_metodologia"), dpuc.getString("bibliografia"), dpuc.getString("observacoes"), dpuc.getString("regime_faltas"), dpuc.getString("linguas"), dpuc.getString("modalidade"), dpuc.getString("requisitos"), dpuc.getString("ficheiros").getBytes(), LocalDate.parse(dpuc.getString("data_alteracao")), dpuc.getString("pagina_publica"), dpuc.getString("funcionamento"), dpuc.getString("aprendizagem"), dpucid);

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus criarUc(JSONObject uc, int regenteid) {
        log.info(uc.toString());

        // INSERT UC
        String sql = "INSERT INTO uc(designacao, ects, uoid) VALUES(?, ?, ?)";
        getJdbcTemplate().update(sql, uc.getString("designacao"), Integer.parseInt(uc.getString("ects"), uc.getInt("uoid")));

        // UC id
        String sql2 = "SELECT id FROM uc WHERE designacao=\'%s\'".formatted(uc.getString("designacao"));
        int UCid = (int) getJdbcTemplate().queryForList(sql2).get(0).get("id");

        // Criar dpuc para ser editado pelo regente <-> estado=C2, periodo_letivo=1 (default) adicionar regente , ver isto melhor
        String sql3 = "INSERT INTO dpuc(criacao_edicao, estadoid, periodo_letivoid, UCid) VALUES(?, ?, ?, ?)";
        getJdbcTemplate().update(sql3, 0, 2, 1, UCid);

        // Dpuc id
        String sql4 = "SELECT d.id FROM (uc JOIN dpuc d ON uc.id = d.UCid) WHERE uc.id = %d".formatted(UCid);
        int dpucid = (int) getJdbcTemplate().queryForList(sql4).get(0).get("id");

        // Ligar DR a Dpuc
        String sql5 = "INSERT INTO utilizadores_dpuc(utilizadoresid, dpucid) VALUES(?, ?)";
        getJdbcTemplate().update(sql5, regenteid, dpucid);

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus criarDpuc(JSONObject dpuc, String designacao) {
        log.info(dpuc.toString());

        // Dpuc id
        String sql = "SELECT d.id FROM (uc JOIN dpuc d ON uc.id = d.UCid) WHERE uc.designacao = \'%s\'".formatted(designacao);
        int dpucid = (int) getJdbcTemplate().queryForList(sql).get(0).get("id");

        // Update dpuc
        String sql2 = "UPDATE dpuc SET duracao=?, carga_horaria=?, horas_contacto=?, horas_trabalho=?, objetivos=?, conteudos=?, coerencia_conteudos=?, metodologias=?, coerencia_metodologia=?, bibliografia=?, observacoes=?, regime_faltas=?, linguas=?, modalidade=?, requisitos=?, ficheiros=?, data_alteracao=?, pagina_publica=?, funcionamento=?, aprendizagem=?, estadoid=? WHERE id=?";
        getJdbcTemplate().update(sql2, dpuc.getString("duracao"), dpuc.getString("carga_horaria"), dpuc.get("horas_contacto"), dpuc.get("horas_trabalho"), dpuc.getString("objetivos"), dpuc.getString("conteudos"), dpuc.getString("coerencia_conteudos"), dpuc.getString("metodologias"), dpuc.getString("coerencia_metodologia"), dpuc.getString("bibliografia"), dpuc.getString("observacoes"), dpuc.getString("regime_faltas"), dpuc.getString("linguas"), dpuc.getString("modalidade"), dpuc.getString("requisitos"), dpuc.getString("ficheiros").getBytes(), LocalDate.parse(dpuc.getString("data_alteracao")), dpuc.getString("pagina_publica"), dpuc.getString("funcionamento"), dpuc.getString("aprendizagem"), 3, dpucid);

        return HttpStatus.OK;
    }
}
