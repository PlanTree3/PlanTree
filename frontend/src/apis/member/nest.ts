// import { AxiosRequestConfig } from 'axios'
import { authApi } from '@/apis'

const nestBaseUrl = 'api/member-service/nest'

// 둥지 생성
const nestCreate = async (data: any): Promise<any> => {
  return authApi
    .post(`${nestBaseUrl}`, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// 둥지 이름 수정
const nestNameUpdate = async (nestId: string, data: any) => {
  authApi
    .patch(`${nestBaseUrl}/${nestId}/name`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 둥지 조회
const nestCheck = async () => {
  return authApi
    .get(`${nestBaseUrl}/parent-nest`)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 삭제
const nestDelete = async (nestId: string) => {
  authApi
    .delete(`${nestBaseUrl}/${nestId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 가입 신청
const nestJoinRequest = async (nestId: any) => {
  authApi
    .post(`${nestBaseUrl}/${nestId}/join-request`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 학생의 그룹 상세
const nestDetail = async (nestId: string) => {
  return authApi
    .get(`${nestBaseUrl}/${nestId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 둥지 학생 리스트 조회
const nestStudents = async (nestId: string) => {
  return authApi
    .get(`${nestBaseUrl}/${nestId}/student`)
    .then((res) => res)
    .catch((err) => err)
}

export {
  nestCreate,
  nestNameUpdate,
  nestDelete,
  nestJoinRequest,
  nestDetail,
  nestStudents,
  nestCheck,
}
