package pi.g6.fetchercriacao.controller;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetchercriacao.entity.*;
import pi.g6.fetchercriacao.service.CreationService;
import pi.g6.fetchercriacao.service.ManipulationService;

import java.util.List;

@RestController
@RequestMapping("/creation")
@Log4j2
public class MainController {


    @Autowired
    private final CreationService creationService;

    @Autowired
    private final ManipulationService manipulationService;

    public MainController(CreationService creationService, ManipulationService manipulationService) {
        this.creationService = creationService;
        this.manipulationService = manipulationService;
    }

    @PostMapping("/criarUC")
    public HttpStatus criarUC(@RequestBody String uc, @RequestParam("cursoid") int cursoid){
        return manipulationService.criarUc(new JSONObject(uc), cursoid);
    }

    @PostMapping("/criarDpuc")
    public HttpStatus criarDpuc(@RequestBody String dpuc, @RequestParam("designacao") String designacao){
        return manipulationService.criarDpuc(new JSONObject(dpuc), designacao);
    }

    @PutMapping("/editarDpuc")
    public HttpStatus editarDpuc(@RequestBody String dpuc, @RequestParam("designacao") String designacao){
        return manipulationService.editarDpuc(new JSONObject(dpuc), designacao);
    }

    @PutMapping("/aprovarDpuc")
    public HttpStatus aprovarDpuc(@RequestParam("designacao") String designacao, @RequestParam("codigo") String codigo){
        return manipulationService.aprovarDpuc(designacao, codigo);
    }

    @PutMapping("/desativarDpuc")
    public HttpStatus desativarDpuc(@RequestParam("designacao") String designacao){
        return manipulationService.desativarDpuc(designacao);
    }

    @GetMapping("/estados")
    public ResponseEntity<List<Estado>> getEstados(){
        return new ResponseEntity<>(creationService.getEstados(), HttpStatus.OK);
    }

    @GetMapping("/periodos-letivos")
    public ResponseEntity<List<PeriodoLetivo>> getPeriodos(){
        return new ResponseEntity<>(creationService.getPeriodos(), HttpStatus.OK);
    }

    @GetMapping("/dpucs")
    public ResponseEntity<List<Dpuc>> getDpucs(){
        return new ResponseEntity<>(creationService.getDPUCs(), HttpStatus.OK);
    }

    @GetMapping("/uos")
    public ResponseEntity<List<UnidadeOrganica>> getUOs(){
        return new ResponseEntity<>(creationService.getUOs(), HttpStatus.OK);
    }

    @GetMapping("/idiomas")
    public ResponseEntity<List<String>> getIdiomas(){
        return new ResponseEntity<>(creationService.getIdiomas(), HttpStatus.OK);
    }

    @GetMapping("/docentes")
    public ResponseEntity<List<Utilizadores>> getDocentes(@RequestParam String UO){
        return new ResponseEntity<>(creationService.getDocente(UO), HttpStatus.OK);
    }

    @GetMapping("/cursos")
    public ResponseEntity<List<Curso>> getCursos(){
        return new ResponseEntity<>(creationService.getCursos(), HttpStatus.OK);
    }

    @GetMapping("/cursos/uo")
    public ResponseEntity<List<Curso>> getCursos(@RequestParam("uo") String UO){
        return new ResponseEntity<>(creationService.getCursos(UO), HttpStatus.OK);
    }

    @GetMapping("/dpucs/ultimas-versoes")
    public ResponseEntity<List<Dpuc>> getUltimasVersoes(){
        return new ResponseEntity<>(creationService.getUltimasVersoes(), HttpStatus.OK);
    }

    @GetMapping("/dpucs/ultima-versao")
    public ResponseEntity<List<Dpuc>> getUltimaVersao(@RequestParam int codigo){
        return new ResponseEntity<>(creationService.getUltimaVersao(codigo), HttpStatus.OK);
    }

    @GetMapping("/dpucs/em-aprovacao")
    public ResponseEntity<List<Dpuc>> getDPUCsEmAprovacao(){
        return new ResponseEntity<>(creationService.getDpucEmAprovacao(), HttpStatus.OK);
    }
}
