package com.plantree.forestservice.domain.tree.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.branch.dto.BranchProjectionDto;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.domain.tree.dto.BranchResDto;
import com.plantree.forestservice.domain.tree.dto.BudResDto;
import com.plantree.forestservice.domain.tree.dto.TreeDetailsResDto;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TreeSearchUseCase {

    private final TreeRepository treeRepository;
    private final BranchRepository branchRepository;
    private final BudRepository budRepository;
    private final AuthMemberValidator authMemberValidator;

//    public TreeDetailsResDto findTreeDetails(UUID treeId, AuthMember authMember) {
//        Tree tree = treeRepository.findById(treeId).orElseThrow(TreeNotFoundException::new);
//        authMemberValidator.validateAuthMember(tree.getStudentId(), authMember);
//
//        List<BranchProjectionDto> branchProjectionDtos = branchRepository.findBranchesByTreeId(treeId);
//
//        List<BranchResDto> branchResDtos = branchProjectionDtos.stream().map(dto -> {
//            List<BudResDto> buds = dto.getBranch().getBuds().stream().map(bud -> new BudResDto(bud))
//                    .collect(Collectors.toList());
//            int totalBudCount = dto.getTotalBudCount();
//            int completedBudCount = dto.getCompletedBudCount();
//            return new BranchResDto(dto.getBranch(), buds, totalBudCount, completedBudCount);
//        }).collect(Collectors.toList());
//
//        return new TreeDetailsResDto(tree, branchResDtos);
//
//    }

    public List<BranchResDto> findBranches(UUID treeId){
        System.out.println("여기다--------------------------------------------");
        List<BranchResDto> branch = branchRepository.findBranches(treeId);
        System.out.println("여기이이ㅣ잉");
        return branch;
    }
}
