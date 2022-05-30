package pi.g6.fetchermain.controller;

import lombok.extern.log4j.Log4j2;
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

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

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

        try {
            String sql = "UPDATE utilizadores SET token=?  WHERE email = ?";
            getJdbcTemplate().update(sql, token, authenticationRequest.getUsername());

        }catch (Exception e){
            log.error("Error while fetching user details from database");
            return ResponseEntity.status(500).body("Error while fetching user details from database");
        }

        return ResponseEntity.ok(new JwtResponse(token));
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
