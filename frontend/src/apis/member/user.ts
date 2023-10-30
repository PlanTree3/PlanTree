import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { api, authApi } from '@/apis'

const memberBaseUrl = 'api/member-service'
const userBaseUrl = 'api/member-service/member'

// 로그인
const userLogin = async (data: unknown): Promise<AxiosResponse> => {
  return api
    .post(`${userBaseUrl}/login`, data)
    .then((res) => res.data.isNewMember)
}

// 회원가입
const userSignup = async (data: AxiosRequestConfig): Promise<AxiosResponse> => {
  return api
    .post(`${userBaseUrl}`, data)
    .then((res) => res.data.memberId)
    .catch((err) => err)
}

// 토큰 리프레쉬
const userRefresh = async () => {
  authApi
    .post(`${userBaseUrl}/refresh`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 프로필 이미지 수정
const userImageUpdate = async (data: AxiosRequestConfig) =>
  authApi
    .patch(`${userBaseUrl}/profile-image`, data)
    .then((res) => res)
    .catch((err) => console.log(err))

// 이름 수정
const userNameUpdate = async (data: AxiosRequestConfig) =>
  authApi
    .patch(`${userBaseUrl}/name`, data)
    .then((res) => res)
    .catch((err) => console.log(err))

// 그룹 둥지 리스트 조회(학생)
const userGroupList = async () => {
  return authApi
    .get(`${memberBaseUrl}/student-group`)
    .then((res) => res)
    .catch((err) => err)
}

// 선생의 그룹 리스트 조회
const teacherGroupList = async () => {
  return authApi
    .get(`${memberBaseUrl}/teacher-group`)
    .then((res) => res)
    .catch((err) => err)
}

// 로그아웃??
const userLogout = async () => authApi.post(`${userBaseUrl}`)

export {
  userLogin,
  userSignup,
  userRefresh,
  userImageUpdate,
  userNameUpdate,
  userGroupList,
  teacherGroupList,
  userLogout,
}
