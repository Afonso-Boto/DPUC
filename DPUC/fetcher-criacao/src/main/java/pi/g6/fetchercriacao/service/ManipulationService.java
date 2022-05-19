package pi.g6.fetchercriacao.service;

import org.json.JSONArray;

public interface ManipulationService {
    void aprovarDpuc(int id);
    void desativarDpuc(int id);
    void editarDpuc(JSONArray dpuc);
    void criarUc(JSONArray uc);
    void criarDpuc(JSONArray dpuc);
}
