package com.plantree.commonservice.domain.inform.infra.database.jpa;

import com.plantree.commonservice.domain.inform.domain.InformFile;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformFileJpaRepository extends JpaRepository<InformFile, UUID> {

}
