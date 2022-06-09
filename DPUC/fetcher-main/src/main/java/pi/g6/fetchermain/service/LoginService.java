package pi.g6.fetchermain.service;

import org.springframework.http.HttpStatus;

public interface LoginService {
    HttpStatus login(String email, String password);
}
