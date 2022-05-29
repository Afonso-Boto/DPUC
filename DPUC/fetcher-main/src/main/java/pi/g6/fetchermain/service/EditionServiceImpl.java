package pi.g6.fetchermain.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;

@Service
public class EditionServiceImpl extends JdbcDaoSupport implements EditionService {
    @Autowired
    DataSource dataSource;

    @Autowired
    CreationManipulationService creationManipulationService;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public HttpStatus setRegente(int dpucid, int regenteId) {
        try{
            String sql = "UPDATE dpuc SET utilizadoresid = ? WHERE id = ?";
            getJdbcTemplate().update(sql, regenteId, dpucid);

        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public ResponseEntity<Integer> definicaoRegente(int dpucid, int regenteId) {
        int new_dpucid = 0;
        LocalDate date = LocalDate.now();

        try{
            // Criar novo dpuc com informação do antigo
            final String sql = String.format("INSERT INTO dpuc(criacao_edicao, duracao, carga_horaria, horas_contacto, horas_trabalho, objetivos, conteudos, coerencia_conteudos, metodologias, coerencia_metodologia, bibliografia, observacoes, regime_faltas, linguas, modalidade, requisitos, ficheiros, data_alteracao, pagina_publica, funcionamento, aprendizagem, estadoid, periodo_letivoid, UCid, utilizadoresid) select criacao_edicao, duracao, carga_horaria, horas_contacto, horas_trabalho, objetivos, conteudos, coerencia_conteudos, metodologias, coerencia_metodologia, bibliografia, observacoes, regime_faltas, linguas, modalidade, requisitos, ficheiros, data_alteracao, pagina_publica, funcionamento, aprendizagem, estadoid, periodo_letivoid, UCid, utilizadoresid FROM dpuc WHERE id = %d", dpucid);
            KeyHolder keyHolder = new GeneratedKeyHolder();
            getJdbcTemplate().update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql,
                        Statement.RETURN_GENERATED_KEYS);

                return ps;
            }, keyHolder);
            new_dpucid = keyHolder.getKey().intValue();

            // Update estado para E2 - Em edição (8 na tabela de estados)
            String sql2 = "UPDATE dpuc SET criacao_edicao=?, data_alteracao=?, utilizadoresid=?, estadoid=? WHERE id = ?";
            getJdbcTemplate().update(sql2, 1, date.toString(), regenteId, 8, new_dpucid);

        }catch (Exception e){
            logger.warn(e.getMessage());
            return new ResponseEntity<>(new_dpucid, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new_dpucid, HttpStatus.OK);
    }

    @Override
    public HttpStatus emEdicao(int dpucid, JSONObject dpuc, boolean finished) {
        try{
            //Update dpuc
            creationManipulationService.editarDpuc(dpuc, dpucid);

            if (finished){
                // Update estado para E3 - Em edição (9 na tabela de estados)
                String sql = "UPDATE dpuc SET estadoid=? WHERE id = ?";
                getJdbcTemplate().update(sql, 9, dpucid);
            }

        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus emAprovacao(int dpucid, boolean aprovado) {
        try{
            String sql = "UPDATE dpuc SET estadoid=? WHERE id = ?";

            if (aprovado){
                // Update estado para E5 - Em aprovação (10 na tabela de estados)
                getJdbcTemplate().update(sql, 10, dpucid);
            }else{
                // Update estado para E2 - Em edição (8 na tabela de estados)
                getJdbcTemplate().update(sql, 8, dpucid);
            }
        }catch (Exception e){
            logger.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }
}
