package com.plantree.forestservice.domain.commons.application;

import com.plantree.forestservice.domain.branch.application.repository.BranchRepository;
import com.plantree.forestservice.domain.branch.domain.Branch;
import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.domain.commons.dto.BranchSearchProjectionDto;
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
import com.plantree.forestservice.global.exception.Branch.BranchNotFoundException;
import com.plantree.forestservice.global.exception.Tree.TreeNotFoundException;
import com.plantree.forestservice.global.util.AuthMemberValidator;
import java.util.ArrayList;
import java.util.HashMap;
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

    private static CommonsMainPageResDto getCommonsMainPageResDto(Tree tree,
            List<Bud> currentBuds) {
        long score = currentBuds.stream()
                                .filter(bud -> bud.isComplete())
                                .count() * 100;

        Map<Day, List<Bud>> groupBudsByDay = currentBuds.stream()
                                                        .collect(
                                                                Collectors.groupingBy(Bud::getDay));

        List<CommonsMainBudResDto> MON = new ArrayList<>();
        List<CommonsMainBudResDto> TUE = new ArrayList<>();
        List<CommonsMainBudResDto> WED = new ArrayList<>();
        List<CommonsMainBudResDto> THU = new ArrayList<>();
        List<CommonsMainBudResDto> FRI = new ArrayList<>();

        for (Day day : groupBudsByDay.keySet()) {
            switch (day.getDay()) {
                case "MON":
                    MON = groupBudsByDay.get(day)
                                        .stream()
                                        .map(bud -> new CommonsMainBudResDto(bud))
                                        .collect(Collectors.toList());
                    break;
                case "TUE":
                    TUE = groupBudsByDay.get(day)
                                        .stream()
                                        .map(bud -> new CommonsMainBudResDto(bud))
                                        .collect(Collectors.toList());
                    break;
                case "WED":
                    WED = groupBudsByDay.get(day)
                                        .stream()
                                        .map(bud -> new CommonsMainBudResDto(bud))
                                        .collect(Collectors.toList());
                    break;
                case "THU":
                    THU = groupBudsByDay.get(day)
                                        .stream()
                                        .map(bud -> new CommonsMainBudResDto(bud))
                                        .collect(Collectors.toList());
                    break;
                case "FRI":
                    FRI = groupBudsByDay.get(day)
                                        .stream()
                                        .map(bud -> new CommonsMainBudResDto(bud))
                                        .collect(Collectors.toList());
                    break;
            }
        }

        CommonsMainDaysResDto commonsMainDaysResDto = new CommonsMainDaysResDto(MON, TUE, WED, THU,
                FRI);
        return new CommonsMainPageResDto(tree, commonsMainDaysResDto, score);
    }

    public CommonsTodoPageResDto findTodoPage(UUID treeId, AuthMember authMember) {

        Map<String, Map> branchInfo = new HashMap<>();
        Map<String, List> branches = new HashMap<>();
        Map<String, Map> budInfo = new HashMap<>();
        List<BranchSearchProjectionDto> projectionDtos = branchRepository.findByTreeId(treeId.toString());
        projectionDtos.stream().forEach(dto -> {
            branches.putIfAbsent(dto.getBranchId(), new ArrayList<>());
            branchInfo.putIfAbsent(dto.getBranchId(), new HashMap());
            Map<String, Object> branchInfoMap = branchInfo.get(dto.getBranchId());
            if(dto.getBranchName() != null){
                branchInfoMap.putIfAbsent("branchName", dto.getBranchName());
                branchInfoMap.putIfAbsent("branchColor", dto.getBranchColor());
            }

            if(dto.getSeedId() != null) {
                branches.get(dto.getBranchId()).add(new CommonsTodoSeedResDto(dto.getSeedId(), dto.getSeedName()));
            }
            if(dto.getBudId() != null){
                budInfo.putIfAbsent(dto.getBudId(), new HashMap());
                Map<String, Object> budInfoMap = budInfo.get(dto.getBudId());
                budInfoMap.put("branchId", dto.getBranchId());
                budInfoMap.put("budName", dto.getBudName());
                budInfoMap.put("dayOfWeek", dto.getDayOfWeek());
                budInfoMap.put("isComplete", dto.isComplete());
                budInfoMap.put("commentCount", dto.getCommentCount());
            }
        });

        List<CommonsTodoBudResDto> budResDtos = budInfo.keySet().stream().map(key -> {
            Map<String, Object> budInfoMap = budInfo.get(key);
            String branchId = budInfoMap.get("branchId").toString();
            Map<String, Object> branch = branchInfo.get(branchId);
            return CommonsTodoBudResDto.builder()
                    .budId(key)
                    .budName((String) budInfoMap.get("budName"))
                    .dayOfWeek((String) budInfoMap.get("dayOfWeek"))
                    .isComplete((Boolean) budInfoMap.get("isComplete"))
                    .commentCount((Integer) budInfoMap.get("commentCount"))
                    .branchId((String) budInfoMap.get("branchId"))
                    .branchColor((String) branch.get("branchColor"))
                    .build();
        }).collect(Collectors.toList());

        List<CommonsTodoBranchResDto> branchResDtos = branches.keySet().stream()
                .map(key -> {
                    Map<String, Object> branchInfoMap = branchInfo.get(key);
                    if(branches.get(key).isEmpty()){
                        return CommonsTodoBranchResDto.builder()
                                .branchId(key)
                                .branchColor((String) branchInfoMap.get("branchColor"))
                                .branchName((String) branchInfoMap.get("branchName"))
                                .seeds(new ArrayList<>())
                                .build();
                    }

                    return CommonsTodoBranchResDto.builder()
                            .branchId(key)
                            .branchColor((String) branchInfoMap.get("branchColor"))
                            .branchName((String) branchInfoMap.get("branchName"))
                            .seeds(branches.get(key))
                            .build();
                }).collect(Collectors.toList());

        return new CommonsTodoPageResDto(branchResDtos, budResDtos);

    }

}
