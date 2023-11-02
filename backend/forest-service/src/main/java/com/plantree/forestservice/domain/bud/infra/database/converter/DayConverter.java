package com.plantree.forestservice.domain.bud.infra.database.converter;

import com.plantree.forestservice.domain.bud.domain.Day;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import lombok.RequiredArgsConstructor;

@Converter
@RequiredArgsConstructor
public class DayConverter implements AttributeConverter<Day, String> {


    @Override
    public String convertToDatabaseColumn(Day day) {
        return day == null ? null : day.name();
    }

    @Override
    public Day convertToEntityAttribute(String name) {
        if(name == null) return null;
        return Day.valueOf(name);
    }
}
