package pi.g6.fetchercriacao.service;

import pi.g6.fetchercriacao.entity.Dpuc;

public interface CreatorService {
    Dpuc createUCVersion(String designacao, String sigla_ac, String ects, String responsavel);
}
