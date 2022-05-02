package pi.g6.fetchercriacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.g6.fetchercriacao.entity.Dpuc;

@Repository
public interface DpucRepository extends JpaRepository<Dpuc, Integer> {
}
