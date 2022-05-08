package pi.g6.fetchercriacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.g6.fetchercriacao.entity.TipoUtilizador;

@Repository
public interface TipoUtilizadorRepository extends JpaRepository<TipoUtilizador, String> {
}
