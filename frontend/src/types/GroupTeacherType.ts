// 그룹 생성(요청)
export type GroupRequest = {
  groupName: string;
};

// 그룹 생성 (응답)
export type GroupResponse = {
  groupId: number;
};

// 그룹 이름 수정 (요청)
export type UpdateGroupNameRequest = {
  groupId: number;
  groupName: string;
};

// 그룹 이름 수정 (응답)
export type UpdateGroupNameResponse = {
  groupId: number;
};

// 그룹 삭제 (요청)
export type DeleteGroupRequest = {
  groupId: number;
};

// 그룹 삭제 (응답)
export type DeleteGroupResponse = {
  statusCode: number;
};