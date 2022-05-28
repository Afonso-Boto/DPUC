package pi.g6.fetcher.service;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class EditionServiceImpl implements EditionService {
    @Override
    public HttpStatus setRegente(int dpucid, int regenteId) {
        return null;
    }

    @Override
    public ResponseEntity<Integer> definicaoRegente(int dpucid, int regenteId) {
        return null;
    }

    @Override
    public HttpStatus emEdicao(int dpucid, JSONObject dpuc, boolean finished) {
        return null;
    }

    @Override
    public HttpStatus emAprovacao(int dpucid, boolean aprovado) {
        return null;
    }
}
