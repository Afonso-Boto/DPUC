package pi.g6.fetchercriacao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Service;
import pi.g6.fetchercriacao.entity.Estado;

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
    public boolean createUC(String designacao, String sigla_ac, String ects, String responsavel) {
        return false;
    }

    @Override
    public List<Estado> allEstados() {
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

        return result;
    }
}
