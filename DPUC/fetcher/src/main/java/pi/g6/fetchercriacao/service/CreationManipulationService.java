package pi.g6.fetchercriacao.service;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;

public interface CreationManipulationService {
    HttpStatus criarUc(JSONObject uc, int regenteid); //C1
    HttpStatus editarDpuc(JSONObject dpuc, int dpucid); //C2
    HttpStatus fecharDpuc(int dpucid); //C3
    HttpStatus emAprovacao(int dpucid, String codigo); //C4
    HttpStatus aprovarDpuc(int dpucid, JSONObject aprovado); //C?
    HttpStatus desativarDpuc(int dpucid); //C6
}
