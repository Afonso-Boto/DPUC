package pi.g6.fetchercriacao.service;

import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.time.LocalDate;

@Repository
@Log4j2
public class CreationManipulationServiceImpl extends JdbcDaoSupport implements CreationManipulationService {
    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }

    @Override
    public HttpStatus criarUc(JSONObject uc, int regenteid) {
        try{
            log.info(uc.toString());

            // INSERT UC
            String sql = "INSERT INTO uc(designacao, ects, unidade_organicaid, acid) VALUES(?, ?, ?, ?)";
            getJdbcTemplate().update(sql, uc.getString("designacao"), uc.getInt("ects"), uc.getInt("unidade_organicaid"), uc.getInt("acid"));

            // UC id
            String sql2 = "SELECT id FROM uc WHERE designacao=\'%s\'".formatted(uc.getString("designacao"));
            int UCid = (int) getJdbcTemplate().queryForList(sql2).get(0).get("id");

            // Criar dpuc para ser editado pelo regente <-> estado=C2, periodo_letivo=1 (default) adicionar regente , ver isto melhor
            LocalDate date = LocalDate.now();
            String sql3 = "INSERT INTO dpuc(criacao_edicao, data_alteracao, estadoid, periodo_letivoid, UCid, utilizadoresid) VALUES(?, ?, ?, ?, ?, ?)";
            getJdbcTemplate().update(sql3, 0, date.toString(), 2, 1, UCid, regenteid);
        }catch (Exception e){
            log.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus editarDpuc(JSONObject dpuc, int dpucid) {
        try{
            // Update dpuc
            LocalDate date = LocalDate.now();

            String sql = "UPDATE dpuc SET duracao=?, carga_horaria=?, horas_contacto=?, horas_trabalho=?, objetivos=?, conteudos=?, coerencia_conteudos=?, metodologias=?, coerencia_metodologia=?, bibliografia=?, observacoes=?, regime_faltas=?, linguas=?, modalidade=?, requisitos=?, ficheiros=?, data_alteracao=?, pagina_publica=?, funcionamento=?, aprendizagem=? WHERE id=?";
            getJdbcTemplate().update(sql, dpuc.getString("duracao"), dpuc.getString("carga_horaria"), dpuc.get("horas_contacto"), dpuc.get("horas_trabalho"), dpuc.getString("objetivos"), dpuc.getString("conteudos"), dpuc.getString("coerencia_conteudos"), dpuc.getString("metodologias"), dpuc.getString("coerencia_metodologias"), dpuc.getString("bibliografia"), dpuc.getString("observacoes"), dpuc.getString("regime_faltas"), dpuc.getString("linguas"), dpuc.getString("modalidade"), dpuc.getString("requisitos"), dpuc.getString("ficheiros").getBytes(), date.toString(), dpuc.getString("pagina_publica"), dpuc.getString("funcionamento"), dpuc.getString("aprendizagem"), dpucid);

        }catch (Exception e){
            log.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus fecharDpuc(int dpucid) {
        try{
            String sql = "UPDATE dpuc SET estadoid=? where id=?";
            getJdbcTemplate().update(sql, 3, dpucid);

        }catch (Exception e){
            log.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }


    @Override
    public HttpStatus emAprovacao(int ucid, String codigo) {
        try{
            String sql = "UPDATE uc SET codigo=? where id=?";
            getJdbcTemplate().update(sql, codigo, ucid);

            // Dpuc id
            String sql2 = "SELECT d.id FROM (uc JOIN dpuc d ON uc.id = d.UCid) WHERE uc.id = \'%s\'".formatted(ucid);
            int dpucid = (int) getJdbcTemplate().queryForList(sql2).get(0).get("id");

            // Update Dpuc estado para C4  "Em Aprovação"
            String sql3 = "UPDATE dpuc SET estadoid=? WHERE id=?";
            getJdbcTemplate().update(sql3, 4, dpucid);

        }catch (Exception e){
            log.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus aprovarDpuc(int dpucid, JSONObject aprovado) {
        try{
            if (aprovado.getBoolean("aprovado")){
                // Update Dpuc estado para C4  "Em Aprovação"
                String sql3 = "UPDATE dpuc SET estadoid=? WHERE id=?";
                getJdbcTemplate().update(sql3, 5, dpucid);

            }else{
                // Update Dpuc estado para C?, campos incorretos
                String sql3 = "UPDATE dpuc SET estadoid=? WHERE id=?";
                getJdbcTemplate().update(sql3, aprovado.get("estadoid"), dpucid);
            }


        }catch (Exception e){
            log.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }

    @Override
    public HttpStatus desativarDpuc(int dpucid) {
        try{
            // Update Dpuc estado para C6 "Desativada"
            String sql = "UPDATE dpuc SET estadoid=? WHERE id=?";
            getJdbcTemplate().update(sql, 6, dpucid);

        }catch (Exception e){
            log.warn(e.getMessage());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return HttpStatus.OK;
    }




}
