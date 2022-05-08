package pi.g6.fetchercriacao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.g6.fetchercriacao.entity.Dpuc;
import pi.g6.fetchercriacao.repository.DpucRepository;

@Service
public class CreatorServiceImpl implements CreatorService{
    @Autowired
    DpucRepository dpucRepository;

    @Override
    public Dpuc createUCVersion(String designacao, String sigla_ac, String ects, String responsavel) {
        Dpuc dpuc = new Dpuc();
        dpuc.setDesignacao(designacao);
        dpuc.setSigla_ac(sigla_ac);
        dpuc.setEcts(ects);
        dpuc.setResponsavel(responsavel);

        dpucRepository.save(dpuc);

        return dpuc;
    }
}
