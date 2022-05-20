package pi.g6.fetchercriacao.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;

public interface ManipulationService {
    void aprovarDpuc(int id);
    void desativarDpuc(int id);
    void editarDpuc(JSONObject dpuc);
    HttpStatus criarUc(JSONObject uc, int cursoid);
    void criarDpuc(JSONObject dpuc);
}
