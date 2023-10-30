// 그룹 생성 (응답)
export type GroupResponse = {
  groupId: number;
};

// 그룹 이름 수정 (응답)
export type UpdateGroupNameResponse = {
  groupId: number;
};


// 그룹 삭제 (응답)
export type DeleteGroupResponse = {
  statusCode: number;
};

// 둥지 생성
export type NestResponse = {
  nestId: number;
};

// 둥지 이름 수정
export type UpdateNestNameResponse = {
  nestId: number;
};

// 둥지 삭제
export type DeleteNestResponse = {
  statusCode: number;
};


// 학생 정보
export type StudentInfo = {
  studentId: number;
  studentName: string;
  totalBudCount: number;
  completedBudCount: number;
};

// 그룹 학생 리스트 조회
export type GroupStudentListResponse = StudentInfo[];
