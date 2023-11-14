package com.plantree.commonservice.domain.inform.application.repository;

import com.plantree.commonservice.domain.inform.domain.InformFile;
import java.util.Optional;
import java.util.UUID;

public interface InformFileRepository {

    Optional<InformFile> findById(UUID informFileId);

    InformFile save(InformFile informFile);

    void deleteById(UUID informFileId);
}
