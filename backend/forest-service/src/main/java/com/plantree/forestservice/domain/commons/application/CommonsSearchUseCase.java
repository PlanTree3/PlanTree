package com.plantree.forestservice.domain.commons.application;

import com.plantree.forestservice.domain.bud.application.repository.BudRepository;
import com.plantree.forestservice.domain.bud.domain.Bud;
import com.plantree.forestservice.domain.bud.domain.Day;
import com.plantree.forestservice.domain.commons.dto.CommonsBudResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsDaysResDto;
import com.plantree.forestservice.domain.commons.dto.CommonsMainPageResDto;
import com.plantree.forestservice.domain.tree.application.repository.TreeRepository;
import com.plantree.forestservice.domain.tree.domain.Tree;
import com.plantree.forestservice.domain.tree.dto.BudResDto;
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

@Service
@RequiredArgsConstructor
public class CommonsSearchUseCase {

    private final TreeRepository treeRepository;
    private final BudRepository budRepository;
    private final AuthMemberValidator authMemberValidator;

    public CommonsMainPageResDto findMainPage(UUID memberId, AuthMember authMember) {

        Tree tree = treeRepository.findCurrentTreeByMemberId(memberId).orElseThrow(TreeNotFoundException::new);
        List<Bud> currentBuds = budRepository.findCurrentBudsByMemberId(memberId);
//        authMemberValidator.validateAuthMember(memberId, authMember);

        long score = currentBuds.stream().filter(bud -> bud.isComplete()).count() * 100;

        Map<Day, List<Bud>> groupBudsByDay = currentBuds.stream()
                .collect(Collectors.groupingBy(Bud::getDay));

        List<CommonsBudResDto> MON = new ArrayList<>();
        List<CommonsBudResDto> TUE = new ArrayList<>();
        List<CommonsBudResDto> WED = new ArrayList<>();
        List<CommonsBudResDto> THU = new ArrayList<>();
        List<CommonsBudResDto> FRI = new ArrayList<>();

        for (Day day : groupBudsByDay.keySet()) {
            switch (day.getDay()) {
                case "MON":
                    MON = groupBudsByDay.get(day).stream().map(bud -> new CommonsBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "TUE":
                    TUE = groupBudsByDay.get(day).stream().map(bud -> new CommonsBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "WED":
                    WED = groupBudsByDay.get(day).stream().map(bud -> new CommonsBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "THU":
                    THU = groupBudsByDay.get(day).stream().map(bud -> new CommonsBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
                case "FRI":
                    FRI = groupBudsByDay.get(day).stream().map(bud -> new CommonsBudResDto(bud))
                            .collect(Collectors.toList());
                    break;
            }
        }

        CommonsDaysResDto commonsDaysResDto = new CommonsDaysResDto(MON, TUE, WED, THU, FRI);
        return new CommonsMainPageResDto(tree, commonsDaysResDto, score);

    }


}
