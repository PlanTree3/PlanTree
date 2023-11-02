insert into member(`member_id`, `oauth_provider`, `oauth_id`, `role`)
values (UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), "KAKAO", "jyStudent",
        "STUDENT"),
       (UNHEX(REPLACE('8c020977-3dda-418d-8c7b-793850930545', '-', '')), "KAKAO", "jyTeacher",
        "TEACHER"),
       (UNHEX(REPLACE('3e0a1f78-c6e0-4a04-9c37-a346282e8039', '-', '')), "KAKAO", "jyParent",
        "PARENT"),
       (UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), "KAKAO", "ysStudent",
        "STUDENT"),
       (UNHEX(REPLACE('6c37d731-df7a-49a7-b710-86dd48014e79', '-', '')), "KAKAO", "ysTeacher",
        "TEACHER"),
       (UNHEX(REPLACE('6307ef61-265d-4f1d-8008-35c38d03fa19', '-', '')), "KAKAO", "ysParent",
        "PARENT");

insert into student(`member_id`)
values (UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', ''))),
       (UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')));

insert into parent(`member_id`)
values (UNHEX(REPLACE('3e0a1f78-c6e0-4a04-9c37-a346282e8039', '-', ''))),
       (UNHEX(REPLACE('6307ef61-265d-4f1d-8008-35c38d03fa19', '-', '')));

insert into teacher(`member_id`)
values (UNHEX(REPLACE('8c020977-3dda-418d-8c7b-793850930545', '-', ''))),
       (UNHEX(REPLACE('6c37d731-df7a-49a7-b710-86dd48014e79', '-', '')));