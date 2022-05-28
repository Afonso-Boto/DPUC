package pi.g6.fetcher.service;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;

public interface EditionService {
    HttpStatus setRegente(int dpucid, int regenteId); //E1 DUO
    HttpStatus emEdicao(int dpucid, JSONObject dpuc); //E2 DR
    HttpStatus emAprovacao(int dpucid, boolean aprovado); //E3 DC
}
