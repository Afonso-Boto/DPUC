package pi.g6.fetchercriacao.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.g6.fetchercriacao.entity.Dpuc;
import pi.g6.fetchercriacao.repository.CursoRepository;
import pi.g6.fetchercriacao.repository.DpucRepository;

@Service
@Log4j2
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

        log.info("Entered service >___________>______________>");
        dpucRepository.save(dpuc);

        return dpuc;
    }
}
