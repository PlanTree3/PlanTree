// 학생 그룹페이지
export type StudentGroupPageResponse = {
  nest: {
    nestId: number;
    nestName: string;
    parents: string[]; // 부모 목록 (둥지장)
    children: string[]; // 자녀 목록
  };
  groups: {
    groupId: number;
    groupName: string;
    leaderProfileImageUrl: string;
  }[];
};

// 학생 둥지 상세 (요청)
export type NestDetailRequest = {
  nestId: number;
};

// 학생 둥지 상세 (응답)
export type NestDetailResponse = {
  nestName: string;
  leaderNames: string[]; // 둥지장
  students: {
    studentId: number;
    studentName: string;
    totalBudCount: number;
    completedBudCount: number;
  }[];
};

// 학생 그룹 상세 (요청)
export type GroupDetailRequest = {
  groupId: number;
};

// 학생 그룹 상세 (응답)
export type GroupDetailResponse = {
  groupName: string;
  leaderName: string; // 둥지장
  students: {
    studentId: number;
    studentName: string;
    totalBudCount: number;
    completedBudCount: number;
  }[];
};