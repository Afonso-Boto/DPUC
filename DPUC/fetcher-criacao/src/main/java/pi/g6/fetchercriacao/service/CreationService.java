package pi.g6.fetchercriacao.service;

import pi.g6.fetchercriacao.entity.Estado;

import java.util.List;

public interface CreationService {
    boolean createUC(String designacao, String sigla_ac, String ects, String responsavel);
    List<Estado> allEstados();
}
