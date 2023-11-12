import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { authApi } from '@/apis'

const groupBaseUrl = 'api/member-service/group'

// 그룹 생성
const groupCreate = async (data: {
  groupName: string
}): Promise<AxiosResponse> => {
  return authApi
    .post(`${groupBaseUrl}`, data)
    .then((res) => res.data)
    .catch((err) => err)
}

// 그룹 이름 수정
const groupNameUpdate = async (groupId: any, data: any) => {
  authApi
    .patch(`${groupBaseUrl}/${groupId}/name`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 삭제
const groupDelete = async (groupId: any) => {
  authApi
    .delete(`${groupBaseUrl}/${groupId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 가입 신청
const groupJoinRequest = async (groupId: any) => {
  authApi
    .post(`${groupBaseUrl}/${groupId}/join-request`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 가입 수락
const groupJoinAccept = async (groupId: any) => {
  authApi
    .patch(`${groupBaseUrl}/${groupId}/join-accept`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹 가입 거절
const groupJoinRefuse = async (groupId: any) => {
  authApi
    .patch(`${groupBaseUrl}/${groupId}/join-refuse`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 학생의 그룹 상세
const groupDetail = async (groupId: any) => {
  return authApi
    .get(`${groupBaseUrl}/${groupId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 학생 리스트 조회
const groupStudents = async (groupId: any) => {
  return authApi
    .get(`${groupBaseUrl}/${groupId}/student`)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 가입 수락 대기 리스트 조회
const groupStudentsRequest = async (groupId: any) => {
  return authApi
    .get(`${groupBaseUrl}/${groupId}/join-request`)
    .then((res) => res)
    .catch((err) => err)
}

export {
  groupCreate,
  groupNameUpdate,
  groupDelete,
  groupJoinRequest,
  groupJoinAccept,
  groupJoinRefuse,
  groupDetail,
  groupStudents,
  groupStudentsRequest,
}
