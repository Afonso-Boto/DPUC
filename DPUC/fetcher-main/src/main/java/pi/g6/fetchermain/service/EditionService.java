package pi.g6.fetchermain.service;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface EditionService {
    HttpStatus setRegente(int dpucid, int regenteId);
    ResponseEntity<Integer> definicaoRegente(int dpucid, int regenteId); //E1 DUO
    HttpStatus emEdicao(int dpucid, JSONObject dpuc, boolean finished); //E2 DR
    HttpStatus emAprovacao(int dpucid, boolean aprovado); //E3 DC
}
