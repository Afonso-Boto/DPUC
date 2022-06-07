package pi.g6.fetchermain.controller;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetchermain.config.JwtRequest;
import pi.g6.fetchermain.config.JwtResponse;
import pi.g6.fetchermain.config.JwtTokenUtil;
import pi.g6.fetchermain.config.JwtUserDetailsService;
import pi.g6.fetchermain.entity.Utilizadores;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController extends JdbcDaoSupport {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        Utilizadores user = new Utilizadores();

        try {

            String query = "SELECT id, nome, nmec, email, tipo_utilizadorid FROM utilizadores WHERE email = \'%s\'".formatted(authenticationRequest.getUsername());
            user.setId((int) getJdbcTemplate().queryForList(query).get(0).get("id"));
            user.setNome((String) getJdbcTemplate().queryForList(query).get(0).get("nome"));
            user.setNmec((int) getJdbcTemplate().queryForList(query).get(0).get("nmec"));
            user.setEmail((String) getJdbcTemplate().queryForList(query).get(0).get("email"));
            user.setTipo_utilizadorid((int) getJdbcTemplate().queryForList(query).get(0).get("tipo_utilizadorid"));

        }catch (Exception e){
            log.error("Error while fetching user details from database");
            return ResponseEntity.status(500).body("Error while fetching user details from database");
        }

        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        map.put("user", user.toString());

        return ResponseEntity.ok(map);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        try {

        }catch (Exception e){
            log.error("Error while fetching user details from database");
            return ResponseEntity.status(500).body("Error while fetching user details from database");
        }

        return ResponseEntity.ok("Logout successful");
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
