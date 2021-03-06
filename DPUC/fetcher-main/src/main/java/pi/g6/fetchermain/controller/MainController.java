package pi.g6.fetchermain.controller;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetchermain.entity.*;
import pi.g6.fetchermain.service.CreationService;
import pi.g6.fetchermain.service.CreationManipulationService;

import java.util.List;

@RestController
@RequestMapping("/creation")
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    private final CreationService creationService;

    @Autowired
    private final CreationManipulationService creationManipulationService;

    public MainController(CreationService creationService, CreationManipulationService creationManipulationService) {
        this.creationService = creationService;
        this.creationManipulationService = creationManipulationService;
    }

    @PostMapping("/criarUC")
    public HttpStatus criarUC(@RequestBody String uc, @RequestParam("regenteid") int regenteid){
        return creationManipulationService.criarUc(new JSONObject(uc), regenteid);
    }

    @PutMapping("/editarDpuc")
    public HttpStatus editarDpuc(@RequestBody String dpuc, @RequestParam("id") int id){
        return creationManipulationService.editarDpuc(new JSONObject(dpuc), id);
    }

    @PutMapping("/fecharDpuc")
    public HttpStatus fecharDpuc(@RequestParam("id") int id){
        return creationManipulationService.fecharDpuc(id);
    }

    @PutMapping("/emAprovacao")
    public HttpStatus aprovarDpuc(@RequestParam("id") int id,
                                  @RequestParam("codigo") String codigo){
        return creationManipulationService.emAprovacao(id, codigo);
    }

    @PutMapping("/aprovarDpuc")
    public HttpStatus aprovarDpuc(@RequestBody String aprovado, @RequestParam("id") int id){
        return creationManipulationService.aprovarDpuc(id, new JSONObject(aprovado));
    }

    @PutMapping("/desativarDpuc")
    public HttpStatus desativarDpuc(@RequestParam("id") int id){
        return creationManipulationService.desativarDpuc(id);
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
    public ResponseEntity<List<DpucUc>> getDpucs(){
        return new ResponseEntity<>(creationService.getDPUCs(), HttpStatus.OK);
    }

    @GetMapping("/dpucs/{id}")
    public ResponseEntity<DpucUc> getDpuc(@PathVariable int id){
        return new ResponseEntity<>(creationService.getDPUC(id), HttpStatus.OK);
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
    public ResponseEntity<List<Utilizadores>> getDocentes(){
        return new ResponseEntity<>(creationService.getDocentes(), HttpStatus.OK);
    }

    @GetMapping("/cursos")
    public ResponseEntity<List<Curso>> getCursos(){
        return new ResponseEntity<>(creationService.getCursos(), HttpStatus.OK);
    }

    @GetMapping("/cursos/uo")
    public ResponseEntity<List<Curso>> getCursos(@RequestParam("uo") String UO){
        return new ResponseEntity<>(creationService.getCursos(UO), HttpStatus.OK);
    }

    @GetMapping("/acs")
    public ResponseEntity<List<AreaCientifica>> getAreasCientificas(){
        return new ResponseEntity<>(creationService.getAreasCientificas(), HttpStatus.OK);
    }

}
