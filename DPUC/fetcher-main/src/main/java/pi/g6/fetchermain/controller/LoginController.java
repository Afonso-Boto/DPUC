package pi.g6.fetchermain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pi.g6.fetchermain.service.LoginService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    LoginService loginService;

    // setCookie to user
    public void setCookie(String name, HttpServletResponse response) {
        // Create cookie
        Cookie jwtTokenCookie = new Cookie("user-id", "secret1");

        jwtTokenCookie.setMaxAge(86400);
        jwtTokenCookie.setSecure(true);
        jwtTokenCookie.setHttpOnly(true);

        // Set cookie onto user
        response.addCookie(jwtTokenCookie);
    }

    @PostMapping("/login")
    public HttpStatus login(@RequestParam("email") String email, @RequestParam("password") String password, HttpServletResponse response) {
        if(loginService.login(email, password) ==  HttpStatus.OK){
            setCookie(email, response);
        }else {
            return HttpStatus.UNAUTHORIZED;
        }

        return HttpStatus.OK;
    }
}
