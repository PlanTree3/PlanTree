package com.plantree.forestservice.domain.commons.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.domain.commons.dto.CommonsMainBudResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsMainDaysResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsMainPageResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsTodoBranchResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsTodoBudResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsTodoPageResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsTodoSeedResDto;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.global.config.webmvc.AuthMember;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommonsSearchUseCase {

    private final TreeRepository treeRepository;
    private final BudRepository budRepository;
    private final BranchRepository branchRepository;
    private final AuthMemberValidator authMemberValidator;

    @Transactional
    public CommonsMainPageResDto findMyMainPage(AuthMember authMember) {

        UUID memberId = authMember.getMemberId();
        Tree tree = treeRepository.findCurrentTreeByMemberId(memberId)
                .orElseThrow(TreeNotFoundException::new);
        List<Bud> currentBuds = budRepository.findCurrentBudsByMemberId(memberId);

        return getCommonsMainPageResDto(tree, currentBuds);

    }

    @Transactional
    public CommonsMainPageResDto findOthersMainPage(UUID memberId, AuthMember authMember) {

        Tree tree = treeRepository.findCurrentTreeByMemberId(memberId)
                .orElseThrow(TreeNotFoundException::new);
        List<Bud> currentBuds = budRepository.findCurrentBudsByMemberId(memberId);
        authMemberValidator.validateAuthMember(memberId, authMember);

        return getCommonsMainPageResDto(tree, currentBuds);

    }

    private static CommonsMainPageResDto getCommonsMainPageResDto(Tree tree, List<Bud> currentBuds) {
        long score = currentBuds.stream().filter(bud -> bud.isComplete()).count() * 100;

        Map<Day, List<Bud>> groupBudsByDay = currentBuds.stream()
                .collect(Collectors.groupingBy(Bud::getDay));

        List<CommonsMainBudResDto> MON = new ArrayList<>();
        List<CommonsMainBudResDto> TUE = new ArrayList<>();
        List<CommonsMainBudResDto> WED = new ArrayList<>();
        List<CommonsMainBudResDto> THU = new ArrayList<>();
        List<CommonsMainBudResDto> FRI = new ArrayList<>();

        for (Day day : groupBudsByDay.keySet()) {
            switch (day.getDay()) {
                case "MON":
                    MON = groupBudsByDay.get(day).stream().map(bud -> new CommonsMainBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "TUE":
                    TUE = groupBudsByDay.get(day).stream().map(bud -> new CommonsMainBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "WED":
                    WED = groupBudsByDay.get(day).stream().map(bud -> new CommonsMainBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "THU":
                    THU = groupBudsByDay.get(day).stream().map(bud -> new CommonsMainBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "FRI":
                    FRI = groupBudsByDay.get(day).stream().map(bud -> new CommonsMainBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
            }
        }

        CommonsMainDaysResDto commonsMainDaysResDto = new CommonsMainDaysResDto(MON, TUE, WED, THU,
                FRI);
        return new CommonsMainPageResDto(tree, commonsMainDaysResDto, score);
    }


    public CommonsTodoPageResDto findTodoPage(UUID treeId, AuthMember authMember) {

        List<Branch> branches = branchRepository.findBranchesWithBudsAndSeedsByTreeId(treeId);
        List<CommonsTodoBudResDto> budResDtos = new ArrayList<>();

        List<CommonsTodoBranchResDto> getBranchResDtoFromBranch = branches.stream().map(branch -> {

            List<CommonsTodoSeedResDto> makeSeedResDtosFromEachBranch = branch.getSeeds().stream()
                    .map(seed -> new CommonsTodoSeedResDto(seed)).collect(Collectors.toList());

            branch.getBuds().forEach(bud -> {
                        budResDtos.add(new CommonsTodoBudResDto(bud, branch, branch.getColor()));
                    }
            );

            return new CommonsTodoBranchResDto(branch, makeSeedResDtosFromEachBranch);

        }).collect(Collectors.toList());

        return new CommonsTodoPageResDto(getBranchResDtoFromBranch, budResDtos);

    }
}
