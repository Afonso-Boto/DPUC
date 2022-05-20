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
    public void aprovarDpuc(int id) {

    }

    @Override
    public void desativarDpuc(int id) {

    }

    @Override
    public void editarDpuc(JSONObject dpuc) {

    }

    @Override
    public HttpStatus criarUc(JSONObject uc, int cursoid) {
        log.info(uc.toString());

        // INSERT UC
        String sql = "INSERT INTO uc(codigo, designacao, sigla_ac, ects) VALUES(?, ?, ?, ?)";
        assert getJdbcTemplate() != null;
        getJdbcTemplate().update(sql, uc.getString("codigo"), uc.getString("designacao"), uc.getString("sigla_ac"), Integer.parseInt(uc.getString("ects")));

        log.info("hey");

        String sql2 = "SELECT id FROM uc WHERE codigo=\'%s\'".formatted(uc.getString("codigo"));
        int UCid = (int) getJdbcTemplate().queryForList(sql2).get(0).get("id");

        log.info("hey");
        // Ligar UC a um curso
        String sql3 = "INSERT INTO curso_UC(curso_id, UCid) VALUES(?, ?)";
        getJdbcTemplate().update(sql3, cursoid, UCid);
        log.info("hey");
        // Criar dpuc para ser editado pelo regente <-> estado=C2, periodo_letivo=1 (default)
        String sql4 = "INSERT INTO dpuc(criacao_edicao, estadoid, periodo_letivoid, UCid) VALUES(?, ?, ?, ?)";
        getJdbcTemplate().update(sql4, 0, 2, 1, UCid);

        return HttpStatus.OK;
    }

    @Override
    public void criarDpuc(JSONObject dpuc) {

    }
}
