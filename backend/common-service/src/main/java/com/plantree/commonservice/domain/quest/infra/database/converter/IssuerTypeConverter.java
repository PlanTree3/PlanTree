package com.plantree.commonservice.domain.quest.infra.database.converter;

import com.plantree.commonservice.domain.quest.domain.IssuerType;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import lombok.RequiredArgsConstructor;

@Converter
@RequiredArgsConstructor
public class IssuerTypeConverter implements AttributeConverter<IssuerType, String> {


    @Override
    public String convertToDatabaseColumn(IssuerType issuerType) {
        return issuerType == null ? null : issuerType.getType();
    }

    @Override
    public IssuerType convertToEntityAttribute(String type) {
        if(type == null) return null;
        return IssuerType.valueOf(type);
     }
}
