package pi.g6.fetchermain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Service
public class LoginServiceImpl extends JdbcDaoSupport implements LoginService {
    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public HttpStatus login(String email, String password) {
        try{
            String sql = String.format("SELECT * FROM utilizadores WHERE email = %s AND password = %s", email, password);
            List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);

            if(rows.isEmpty())
                throw new Exception("Login inválido");


        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.UNAUTHORIZED;
        }

        return HttpStatus.OK;
    }
}
