insert into nest(`nest_id`, `name`)
values (UNHEX(REPLACE('11ee7889-a159-9820-bdd7-7f9f1905d5ad', '-', '')), "둥지이름");

insert into member(`member_id`, `oauth_provider`, `oauth_id`, `role`, `name`)
values (UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), "KAKAO", "jyStudent",
        "STUDENT", "jyStudent"),
       (UNHEX(REPLACE('8c020977-3dda-418d-8c7b-793850930545', '-', '')), "KAKAO", "jyTeacher",
        "TEACHER", "jyTeacher"),
       (UNHEX(REPLACE('3e0a1f78-c6e0-4a04-9c37-a346282e8039', '-', '')), "KAKAO", "jyParent",
        "PARENT", "jyParent"),
       (UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), "KAKAO", "ysStudent",
        "STUDENT", "ysStudent"),
       (UNHEX(REPLACE('6c37d731-df7a-49a7-b710-86dd48014e79', '-', '')), "KAKAO", "ysTeacher",
        "TEACHER", "ysTeacher"),
       (UNHEX(REPLACE('6307ef61-265d-4f1d-8008-35c38d03fa19', '-', '')), "KAKAO", "ysParent",
        "PARENT", "ysParent");

insert into student(`member_id`, `name`, `nest_id`)
values (UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), "jyStudent",
        UNHEX(REPLACE('11ee7889-a159-9820-bdd7-7f9f1905d5ad', '-', ''))),
       (UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), "ysStudent",
        UNHEX(REPLACE('11ee7889-a159-9820-bdd7-7f9f1905d5ad', '-', '')));

insert into parent(`member_id`, `name`, `nest_id`)
values (UNHEX(REPLACE('3e0a1f78-c6e0-4a04-9c37-a346282e8039', '-', '')), "jyParent",
        UNHEX(REPLACE('11ee7889-a159-9820-bdd7-7f9f1905d5ad', '-', ''))),
       (UNHEX(REPLACE('6307ef61-265d-4f1d-8008-35c38d03fa19', '-', '')), "ysParent",
        UNHEX(REPLACE('11ee7889-a159-9820-bdd7-7f9f1905d5ad', '-', '')));

insert into teacher(`member_id`, `name`)
values (UNHEX(REPLACE('8c020977-3dda-418d-8c7b-793850930545', '-', '')), "jyTeacher"),
       (UNHEX(REPLACE('6c37d731-df7a-49a7-b710-86dd48014e79', '-', '')), "ysTeacher");