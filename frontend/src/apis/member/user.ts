import { AxiosResponse } from 'axios'
import Swal from 'sweetalert2'
// import { useNavigate } from 'react-router-dom'
import { api, authApi } from '@/apis'

const memberBaseUrl = 'api/member-service'
const userBaseUrl = 'api/member-service/member'

const showLogInErrorModal = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 오류',
    text: '로그인을 다시 해주세요',
    confirmButtonText: '확인',
  })
}

// 로그인
const userLogin = async (data: unknown): Promise<AxiosResponse> => {
  return api
    .post(`${userBaseUrl}/login`, data)
    .then((res) => {
      console.log(res.data.data.newMember)

      return res.data.data.newMember
    })
    .catch((error) => {
      console.log(error)
      showLogInErrorModal()
      return error
    })
}

// 회원가입
const userSignup = async (data: unknown): Promise<AxiosResponse> => {
  return api
    .post(`${userBaseUrl}`, data)
    .then((res) => {
      console.log('회원가입 이후 확인', res)
      return res.data.memberId
    })
    .catch((err) => err)
}

// 유저 정보 받아오기
const userInfo = async (): Promise<any> => {
  try {
    const response = await api.get(`${userBaseUrl}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

// 토큰 리프레쉬
const userRefresh = async () => {
  // const navigate = useNavigate()
  authApi
    .post(`${userBaseUrl}/refresh`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
}

// 프로필 이미지 수정
const userImageUpdate = async (data: unknown) =>
  authApi
    .patch(`${userBaseUrl}/profile-image`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

// 이름 수정
const userNameUpdate = async (data: unknown) =>
  authApi
    .patch(`${userBaseUrl}/name`, data)
    .then((res) => res)
    .catch((err) => console.log(err))

// 그룹 둥지 리스트 조회(학생)
const userGroupList = async () => {
  return authApi
    .get(`${memberBaseUrl}/group/student-group`)
    .then((res) => res)
    .catch((err) => err)
}

// 선생의 그룹 리스트 조회
const teacherGroupList = async () => {
  return authApi
    .get(`${memberBaseUrl}/group/teacher-group`)
    .then((res) => res)
    .catch((err) => err)
}

// 로그아웃??
const userLogout = async () => {
  return authApi
    .post(`${userBaseUrl}/logout`)
    .then((res) => res)
    .catch((err) => console.log(err))
}

export {
  userLogin,
  userSignup,
  userInfo,
  userRefresh,
  userImageUpdate,
  userNameUpdate,
  userGroupList,
  teacherGroupList,
  userLogout,
}
