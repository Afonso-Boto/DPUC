package pi.g6.fetchercriacao.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetchercriacao.entity.*;
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

    @GetMapping("/estados")
    public ResponseEntity<List<Estado>> getEstados(){
        return new ResponseEntity<>(service.getEstados(), HttpStatus.OK);
    }

    @GetMapping("/periodos-letivos")
    public ResponseEntity<List<PeriodoLetivo>> getPeriodos(){
        return new ResponseEntity<>(service.getPeriodos(), HttpStatus.OK);
    }

    @GetMapping("/dpucs")
    public ResponseEntity<List<Dpuc>> getDpucs(){
        return new ResponseEntity<>(service.getDPUCs(), HttpStatus.OK);
    }

    @GetMapping("/uos")
    public ResponseEntity<List<UnidadeOrganica>> getUOs(){
        return new ResponseEntity<>(service.getUOs(), HttpStatus.OK);
    }

    @GetMapping("/idiomas")
    public ResponseEntity<List<String>> getIdiomas(){
        return new ResponseEntity<>(service.getIdiomas(), HttpStatus.OK);
    }

    @GetMapping("/docentes")
    public ResponseEntity<List<Utilizadores>> getDocentes(@RequestParam String UO){
        return new ResponseEntity<>(service.getDocente(UO), HttpStatus.OK);
    }

    @GetMapping("/cursos")
    public ResponseEntity<List<Curso>> getCursos(){
        return new ResponseEntity<>(service.getCursos(), HttpStatus.OK);
    }

    @GetMapping("/cursos/uo")
    public ResponseEntity<List<Curso>> getCursos(@RequestParam("uo") String UO){
        return new ResponseEntity<>(service.getCursos(UO), HttpStatus.OK);
    }

    @GetMapping("/dpucs/ultimas-versoes")
    public ResponseEntity<List<Dpuc>> getUltimasVersoes(){
        return new ResponseEntity<>(service.getUltimasVersoes(), HttpStatus.OK);
    }

    @GetMapping("/dpucs/ultima-versao")
    public ResponseEntity<List<Dpuc>> getUltimaVersao(@RequestParam int codigo){
        return new ResponseEntity<>(service.getUltimaVersao(codigo), HttpStatus.OK);
    }

    @GetMapping("/dpucs/em-aprovacao")
    public ResponseEntity<List<Dpuc>> getDPUCsEmAprovacao(){
        return new ResponseEntity<>(service.getDpucEmAprovacao(), HttpStatus.OK);
    }
}
