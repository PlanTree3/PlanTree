package com.plantree.memberservice.domain.member.domain;

public enum Role {
    PARENT(Values.PARENT),
    TEACHER(Values.TEACHER),
    STUDENT(Values.STUDENT);

    private String values;

    Role(String role) {
        if (!this.name()
                 .equals(role)) {
            throw new IllegalArgumentException("Incorrect use of GroupType");
        }
    }

    public static class Values {

        public static final String PARENT = "PARENT";
        public static final String TEACHER = "TEACHER";
        public static final String STUDENT = "STUDENT";
    }
}
