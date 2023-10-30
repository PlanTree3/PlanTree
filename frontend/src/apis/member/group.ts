import { AxiosRequestConfig } from 'axios'
import { authApi } from '..'

const groupBaseUrl = 'api/member-service/group'

// 그룹 생성
const groupCreate = async (data: AxiosRequestConfig): Promise<string> => {
  return authApi
    .post(`${groupBaseUrl}`, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// 그룹 이름 수정
const groupNameUpdate = async (groupId: number, data: AxiosRequestConfig) => {
  authApi
    .patch(`${groupBaseUrl}/${groupId}`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 삭제

// 그룹 가입 신청

// 그룹 가입 수락

// 학생의 그룹 상세

// 선생의 그룹 리스트 조회

// 그룹 학생 리스트 조회

export { groupCreate, groupNameUpdate }
