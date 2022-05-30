package pi.g6.fetchermain.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@Service
public class JwtUserDetailsService extends JdbcDaoSupport implements UserDetailsService {
	@Autowired
	DataSource dataSource;

	@PostConstruct
	private void initialize(){
		setDataSource(dataSource);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			logger.info("loadUserByUsername: " + username);

			String sql = "SELECT * FROM utilizadores WHERE email = ?";
			Map<String, Object> row = getJdbcTemplate().queryForList(sql, username).get(0);

			logger.info("loadUserByUsername: " + row.toString());
			logger.info("loadUserByUsername: " + row.get("password"));

			return new User(username, new BCryptPasswordEncoder().encode(row.get("password").toString()), new ArrayList<>());
		}catch (Exception e){
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}

}