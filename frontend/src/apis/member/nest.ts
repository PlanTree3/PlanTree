import { AxiosRequestConfig } from 'axios'
import { authApi } from '@/apis'

const nestBaseUrl = 'api/member-service/nest'

// 둥지 생성
const nestCreate = async (data: AxiosRequestConfig): Promise<string> => {
  return authApi
    .post(`${nestBaseUrl}`, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// 둥지 이름 수정
const nestNameUpdate = async (nestId: number, data: AxiosRequestConfig) => {
  authApi
    .patch(`${nestBaseUrl}/${nestId}`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 둥지 조회
const nestCheck = async () => {
  authApi
    .get(`${nestBaseUrl}/parent-nest`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 삭제
const nestDelete = async (nestId: number) => {
  authApi
    .delete(`${nestBaseUrl}/${nestId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 가입 신청
const nestJoinRequest = async (nestId: number) => {
  authApi
    .post(`${nestBaseUrl}/${nestId}/join-request`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 가입 수락
const nestJoinAccept = async (nestId: number) => {
  authApi
    .patch(`${nestBaseUrl}/${nestId}/join-accept`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 학생의 그룹 상세
const nestDetail = async (nestId: number) => {
  return authApi
    .get(`${nestBaseUrl}/${nestId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 학생 리스트 조회
const nestStudents = async (nestId: number) => {
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
  nestJoinAccept,
  nestDetail,
  nestStudents,
  nestCheck,
}
