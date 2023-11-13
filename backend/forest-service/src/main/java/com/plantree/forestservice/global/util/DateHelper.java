package com.plantree.forestservice.global.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DateHelper {

    public LocalDate findNextSunday() {
        LocalDate now = LocalDate.now();
        DayOfWeek currentDayOfWeek = now.getDayOfWeek();
        return now.plusDays(DayOfWeek.SUNDAY.getValue() - currentDayOfWeek.getValue());
    }

}
