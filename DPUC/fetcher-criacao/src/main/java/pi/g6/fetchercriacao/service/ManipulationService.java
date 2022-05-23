package pi.g6.fetchercriacao.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;

public interface ManipulationService {
    HttpStatus aprovarDpuc(int ucid, String codigo);
    HttpStatus desativarDpuc(int dpucid);
    HttpStatus editarDpuc(JSONObject dpuc, int dpucid);
    HttpStatus criarUc(JSONObject uc, int regenteid);
}
