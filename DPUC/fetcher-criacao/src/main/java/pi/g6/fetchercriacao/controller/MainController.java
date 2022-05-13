package pi.g6.fetchercriacao.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetchercriacao.entity.Estado;
import pi.g6.fetchercriacao.service.CreationService;

import java.util.List;

@RestController
@RequestMapping("/creation")
@Log4j2
public class MainController {


    @Autowired
    private final CreationService service;

    public MainController(CreationService service) {
        this.service = service;
    }

//    @PostMapping("/createUC")
//    public ResponseEntity<Dpuc> createUC(@RequestParam(name = "designacao") String designacao,
//                                         @RequestParam(name = "sigla_ac") String sigla_ac,
//                                         @RequestParam(name = "ects") String ects,
//                                         @RequestParam(name = "responsavel") String responsavel){
//        log.info("Requested DPUC!");
//        return new ResponseEntity<>(dpuc, HttpStatus.OK);
//    }

    @GetMapping("/estados")
    public ResponseEntity<List<Estado>> allEstados(){
        return new ResponseEntity<>(service.allEstados(), HttpStatus.OK);
    }
}
