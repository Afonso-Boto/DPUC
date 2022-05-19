package pi.g6.fetchercriacao.service;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import pi.g6.fetchercriacao.entity.Estado;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ManipulationServiceImpl extends JdbcDaoSupport implements ManipulationService{
    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }


    @Override
    public void aprovarDpuc(int id) {
        String sql = "SELECT * FROM estado";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);

        List<Estado> result = new ArrayList<Estado>();
        for (Map<String, Object> row : rows) {
            Estado estado = new Estado();
            estado.setId((int) row.get("id"));
            estado.setNome((String) row.get("nome"));
            estado.setDescricao((String) row.get("descricao"));

            result.add(estado);
        }
    }

    @Override
    public void desativarDpuc(int id) {

    }

    @Override
    public void editarDpuc(JSONArray dpuc) {

    }

    @Override
    public void criarUc(JSONArray uc) {

    }

    @Override
    public void criarDpuc(JSONArray dpuc) {

    }
}
