insert into forest(`forest_id`, `started_at`, `ended_at`, `student_id`)
values (UNHEX(REPLACE('63b61c82-5f91-4e0a-983e-2c22dd6b65d3', '-', '')), '2023-03-06', '2024-03-03', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', ''))),
       (UNHEX(REPLACE('2ff10b79-4d2a-4ed4-8b68-26856c9e0e69', '-', '')), '2022-03-07', '2023-03-05', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', ''))),
       (UNHEX(REPLACE('6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19', '-', '')), '2023-03-06', '2024-03-03', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', ''))),
       (UNHEX(REPLACE('23e77f3c-30f1-4f64-a42c-8b42de61d0ed', '-', '')), '2022-03-07', '2023-03-05', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')));

insert into tree(`tree_id`, `name`, `started_at`, `ended_at`, `student_id`, `forest_id`)
values (UNHEX(REPLACE('a0f42975-33ef-4500-85cd-1817d7a8f431', '-', '')), '나의 라임오렌지나무1','2023-10-02', '2023-10-08', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('63b61c82-5f91-4e0a-983e-2c22dd6b65d3', '-', ''))),
       (UNHEX(REPLACE('f543c1c4-6cd3-432f-b4cf-c1ec6b9c9997', '-', '')), '나의 라임오렌지나무2','2023-10-09', '2023-10-15', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('63b61c82-5f91-4e0a-983e-2c22dd6b65d3', '-', ''))),
       (UNHEX(REPLACE('f1b755d0-0a21-4ec3-9f06-614ed75b00f1', '-', '')), '나의 라임오렌지나무3','2023-10-16', '2023-10-22', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('63b61c82-5f91-4e0a-983e-2c22dd6b65d3', '-', ''))),
       (UNHEX(REPLACE('9c6d3bc5-89e7-4419-b5c0-6a3a88f9a51b', '-', '')), '나의 라임오렌지나무4','2023-10-23', '2023-10-29', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('63b61c82-5f91-4e0a-983e-2c22dd6b65d3', '-', ''))),
       (UNHEX(REPLACE('30a4d366-2d5d-4c3d-9a91-3ff4f20f3999', '-', '')), '나의 라임오렌지나무5','2023-10-30', '2023-11-04', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('63b61c82-5f91-4e0a-983e-2c22dd6b65d3', '-', ''))),
       (UNHEX(REPLACE('b11a7f84-ea61-4e91-90a5-00b601453b11', '-', '')), '나의 라임오렌지나무1','2023-10-02', '2023-10-08', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19', '-', ''))),
       (UNHEX(REPLACE('21a4e16c-4d5c-4e6c-9b02-9597c57e3b6b', '-', '')), '나의 라임오렌지나무2','2023-10-09', '2023-10-15', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19', '-', ''))),
       (UNHEX(REPLACE('7f94c1da-5c9b-48d4-8e13-14094a82ad06', '-', '')), '나의 라임오렌지나무3','2023-10-16', '2023-10-22', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19', '-', ''))),
       (UNHEX(REPLACE('72c2a348-321b-4e0b-98b5-bd6b8c178a14', '-', '')), '나의 라임오렌지나무4','2023-10-23', '2023-10-29', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19', '-', ''))),
       (UNHEX(REPLACE('9839fc1d-843c-491c-9a71-5c1b8efb22c7', '-', '')), '나의 라임오렌지나무5','2023-11-06', '2023-11-12', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19', '-', '')));

insert into branch(`branch_id`, `name`, `color`, `student_id`, `issuer_id`, `tree_id`)
values (UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', '')), '수학 1', '223344', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('30a4d366-2d5d-4c3d-9a91-3ff4f20f3999', '-', ''))),
       (UNHEX(REPLACE('6cd8b78d-1b3a-4c72-93be-7d6b6e11a98d', '-', '')), '수학 2', '223344', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('30a4d366-2d5d-4c3d-9a91-3ff4f20f3999', '-', ''))),
       (UNHEX(REPLACE('2e65ca6e-6019-4e2a-83a2-47c93b1e03f7', '-', '')), '수학 3', '223344', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('30a4d366-2d5d-4c3d-9a91-3ff4f20f3999', '-', ''))),
       (UNHEX(REPLACE('49e3e2e2-6162-4b84-bdda-b3ac006bbdbb', '-', '')), '수학 4', '223344', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('30a4d366-2d5d-4c3d-9a91-3ff4f20f3999', '-', ''))),
       (UNHEX(REPLACE('8c9432f2-ae33-4ee6-b61d-cb454a1a1d9a', '-', '')), '수학 5', '223344', UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('30a4d366-2d5d-4c3d-9a91-3ff4f20f3999', '-', ''))),
       (UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', '')), '영어 1', '223344', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('9839fc1d-843c-491c-9a71-5c1b8efb22c7', '-', ''))),
       (UNHEX(REPLACE('4f68b02b-0ca7-4c5a-8192-660f20b25132', '-', '')), '영어 2', '223344', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('9839fc1d-843c-491c-9a71-5c1b8efb22c7', '-', ''))),
       (UNHEX(REPLACE('b7d74ef2-9a20-44ea-9527-4b3c9b3bd8a6', '-', '')), '영어 3', '223344', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('9839fc1d-843c-491c-9a71-5c1b8efb22c7', '-', ''))),
       (UNHEX(REPLACE('d3e9c11c-d52c-4b77-8fc5-7e1e0839f90c', '-', '')), '영어 4', '223344', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('9839fc1d-843c-491c-9a71-5c1b8efb22c7', '-', ''))),
       (UNHEX(REPLACE('2e96a422-0a32-4d67-9e63-2a3c82568d85', '-', '')), '영어 5', '223344', UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('9839fc1d-843c-491c-9a71-5c1b8efb22c7', '-', '')));

insert into bud(`bud_id`, `name`, `day`, `is_complete`, `student_id`, `branch_id`)
values (UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', '')), '수학 문제 풀기1', 'MON', 1, UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('6cd8b78d-1b3a-4c72-93be-7d6b6e11a98d', '-', '')), '수학 문제 풀기2', 'TUE', 0,UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('2e65ca6e-6019-4e2a-83a2-47c93b1e03f7', '-', '')), '수학 문제 풀기3', 'MON', 1,UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('49e3e2e2-6162-4b84-bdda-b3ac006bbdbb', '-', '')), '수학 문제 풀기4', 'MON', 1,UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('8c9432f2-ae33-4ee6-b61d-cb454a1a1d9a', '-', '')), '수학 문제 풀기5', 'MON', 1,UNHEX(REPLACE('cdd10ab0-58cf-459b-a78f-56b881ae68c5', '-', '')), UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', '')), '영어 문제 풀기1', 'MON', 1,UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('4f68b02b-0ca7-4c5a-8192-660f20b25132', '-', '')), '영어 문제 풀기2', 'TUE', 1,UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('b7d74ef2-9a20-44ea-9527-4b3c9b3bd8a6', '-', '')), '영어 문제 풀기3', 'TUE', 0,UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('d3e9c11c-d52c-4b77-8fc5-7e1e0839f90c', '-', '')), '영어 문제 풀기4', 'TUE', 0,UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('2e96a422-0a32-4d67-9e63-2a3c82568d85', '-', '')), '영어 문제 풀기5', 'TUE', 1,UNHEX(REPLACE('c2fba506-e07e-428c-af51-c63b98960a41', '-', '')), UNHEX(REPLACE('4f68b02b-0ca7-4c5a-8192-660f20b25132', '-', '')));

insert into seed(`seed_id`, `name`, `branch_id`)
values (UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', '')), '수학 문제 풀기1', UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('6cd8b78d-1b3a-4c72-93be-7d6b6e11a98d', '-', '')), '수학 문제 풀기2', UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('2e65ca6e-6019-4e2a-83a2-47c93b1e03f7', '-', '')), '수학 문제 풀기3', UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('49e3e2e2-6162-4b84-bdda-b3ac006bbdbb', '-', '')), '수학 문제 풀기4', UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('8c9432f2-ae33-4ee6-b61d-cb454a1a1d9a', '-', '')), '수학 문제 풀기5', UNHEX(REPLACE('2d9ddfa1-d6a2-4a6f-b25a-b92619001d0c', '-', ''))),
       (UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', '')), '영어 문제 풀기1', UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('4f68b02b-0ca7-4c5a-8192-660f20b25132', '-', '')), '영어 문제 풀기2', UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('b7d74ef2-9a20-44ea-9527-4b3c9b3bd8a6', '-', '')), '영어 문제 풀기3', UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('d3e9c11c-d52c-4b77-8fc5-7e1e0839f90c', '-', '')), '영어 문제 풀기4', UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', ''))),
       (UNHEX(REPLACE('2e96a422-0a32-4d67-9e63-2a3c82568d85', '-', '')), '영어 문제 풀기5', UNHEX(REPLACE('7b5421ca-4d89-4d1d-80b9-6533aaacdd3a', '-', '')));