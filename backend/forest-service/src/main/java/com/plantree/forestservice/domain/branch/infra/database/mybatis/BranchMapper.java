package com.plantree.forestservice.domain.branch.infra.database.mybatis;

import com.plantree.forestservice.domain.commons.dto.BranchSearchProjectionDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BranchMapper {

    List<BranchSearchProjectionDto> findByTreeId(String treeId);

}
