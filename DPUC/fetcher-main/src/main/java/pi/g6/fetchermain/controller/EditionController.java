package pi.g6.fetchermain.controller;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetchermain.entity.DpucUc;
import pi.g6.fetchermain.service.EditionService;

import java.util.List;

@RestController
@RequestMapping("/edition")
@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
public class EditionController {

    @Autowired
    private final EditionService editionService;

    public EditionController(EditionService editionService) {
        this.editionService = editionService;
    }

    @PutMapping("/setRegente")
    public HttpStatus setRegente(@RequestParam("id") int id, @RequestParam("regenteid") int regenteid) {
        return editionService.setRegente(id, regenteid);
    }

    @GetMapping("/getAllDpucs")
    public ResponseEntity<List<DpucUc>> getAllDpucs(@RequestParam("id") int id) {
        return editionService.getAllDpucs(id);
    }

    @PutMapping("/iniciarEdicao")
    public HttpStatus iniciarEdicao() {
        return editionService.iniciarEdicao();
    }

    @PutMapping("/definicaoRegente")
    public ResponseEntity<Integer> definicaoRegente(@RequestParam("id") int id, @RequestParam("regenteid") int regenteid) {
        return editionService.definicaoRegente(id, regenteid);
    }

    @PutMapping("/emEdicao")
    public HttpStatus emEdicao(@RequestBody String json, @RequestParam("id") int id, @RequestParam("finished") boolean finished) {
        return editionService.emEdicao(id, new JSONObject(json), finished);
    }

    @PutMapping("/emAprovacao")
    public HttpStatus emAprovacao(@RequestParam("id") int id, @RequestParam("aprovado") boolean aprovado) {
        return editionService.emAprovacao(id, aprovado);
    }
}
