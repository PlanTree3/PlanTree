import { AxiosRequestConfig } from 'axios'
import { authApi } from '..'

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

// 둥지 삭제

// 둥지 가입 신청

// 둥지 가입 수락

// 학생의 둥지 상세

// 둥지 학생 리스트 조회

export { nestCreate, nestNameUpdate }
