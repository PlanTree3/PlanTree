// 그룹 생성 (응답)
export type GroupResponse = {
  statusCode: number
  message: string
  data: {
    groupId: number
  }
}

//그룹 생성(요청)
export type GroupRequest = {
  groupName: string
}

// 그룹 이름 수정 (응답)
export type UpdateGroupNameResponse = {
  statusCode: number
  message: string
  data: null
}

// 그룹 삭제 (응답)
export type DeleteGroupResponse = {
  statusCode: number
}

// 둥지 생성
export type NestResponse = {
  statusCode: number
  message: string
  data: {
    nestId: string
  }
}

// 둥지 이름 수정
export type UpdateNestNameResponse = {
  statusCode: number
  message: string
  data: null
}

// 둥지 삭제
export type DeleteNestResponse = {
  statusCode: number
}

// 학생 정보
export type StudentInfo = {
  studentId: number
  studentName: string
  totalBudCount: number
  completedBudCount: number
}

// 그룹 학생 리스트 조회
export type GroupStudentListResponse = StudentInfo[]
