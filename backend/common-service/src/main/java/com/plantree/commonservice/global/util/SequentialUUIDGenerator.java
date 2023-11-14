package com.plantree.commonservice.global.util;

import com.fasterxml.uuid.Generators;
import java.util.UUID;

public class SequentialUUIDGenerator {
    public static UUID generateSequentialUUID() {
        UUID uuid = Generators.timeBasedGenerator()
                .generate();
        String[] uuidArr = uuid.toString()
                .split("-");
        String uuidStr = uuidArr[2] + uuidArr[1] + uuidArr[0] + uuidArr[3] + uuidArr[4];
        StringBuffer sb = new StringBuffer(uuidStr);
        sb.insert(8, "-");
        sb.insert(13, "-");
        sb.insert(18, "-");
        sb.insert(23, "-");
        uuid = UUID.fromString(sb.toString());
        return uuid;
    }

}
