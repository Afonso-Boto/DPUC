package pi.g6.fetcher.controller;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pi.g6.fetcher.service.EditionService;

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
    public void setRegente(@RequestParam("id") int id, @RequestParam("regenteid") int regenteid) {
        editionService.setRegente(id, regenteid);
    }

    @PutMapping("/emEdicao")
    public void emEdicao(@RequestBody String json, @RequestParam("id") int id, @RequestParam("finished") boolean finished) {
        editionService.emEdicao(id, new JSONObject(json), finished);
    }

    @PutMapping("/emAprovacao")
    public void emAprovacao(@RequestParam("id") int id, @RequestParam("aprovado") boolean aprovado) {
        editionService.emAprovacao(id, aprovado);
    }
}
