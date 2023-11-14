package com.plantree.commonservice.domain.inform.controller;

import com.plantree.commonservice.domain.inform.application.InformCreateUseCase;
import com.plantree.commonservice.domain.inform.application.InformDeleteUseCase;
import com.plantree.commonservice.domain.inform.application.InformSearchUseCase;
import com.plantree.commonservice.domain.inform.application.InformUpdateUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InformController {

    private final InformCreateUseCase informCreateUseCase;
    private final InformUpdateUseCase informUpdateUseCase;
    private final InformDeleteUseCase informDeleteUseCase;
    private final InformSearchUseCase informSearchUseCase;

}
