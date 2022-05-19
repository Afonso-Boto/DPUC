package pi.g6.fetchercriacao.service;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

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
    public void editarDpuc(JSONArray dpuc) {

    }

    @Override
    public void criarUc(JSONArray uc) {

    }

    @Override
    public void criarDpuc(JSONArray dpuc) {

    }
}
