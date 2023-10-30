import { AxiosRequestConfig } from 'axios'
import { api, authApi } from '..'

const userBaseUrl = 'api/member-service/member'

// 로그인
const userLogin = async (data: AxiosRequestConfig): Promise<string> => {
  return api
    .post(`${userBaseUrl}/login`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

// 회원가입
const userSignup = async (data: AxiosRequestConfig): Promise<string> => {
  return api
    .post(`${userBaseUrl}`, data)
    .then((res) => res.data.memberId)
    .catch((err) => console.log(err))
}

// 토큰 리프레쉬
const userRefresh = async (): Promise<string> => {
  return authApi
    .post(`${userBaseUrl}/refresh`)
    .then((res) => res)
    .catch((err) => err)
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
const userGroupList = async (data: AxiosRequestConfig) =>
  authApi
    .get(`api/member-service/student-group`, data)
    .then((res) => res)
    .catch((err) => console.log(err))

// 로그아웃
const userLogout = async () => authApi.post(`${userBaseUrl}`)

export {
  userLogin,
  userSignup,
  userRefresh,
  userImageUpdate,
  userNameUpdate,
  userGroupList,
  userLogout,
}
