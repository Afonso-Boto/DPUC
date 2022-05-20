package pi.g6.fetchercriacao.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;

public interface ManipulationService {
    HttpStatus aprovarDpuc(String designacao, String codigo);
    HttpStatus desativarDpuc(String designacao);
    HttpStatus editarDpuc(JSONObject dpuc, String designacao);
    HttpStatus criarUc(JSONObject uc, int cursoid);
    HttpStatus criarDpuc(JSONObject dpuc, String designacao);
}
