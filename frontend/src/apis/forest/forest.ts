import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { authApi } from '@/apis'
import { branchApiUrl, scheduleUrl, seedApiUrl, treeApiUrl } from '@/utils'

const baseUrl = 'api/forest-service'
const forestBaseUrl = 'api/forest-service/forest'

// 메인페이지
const mainPageApi = async (memberId: string): Promise<AxiosResponse> => {
  return authApi
    .get(`${baseUrl}/commons/main/${memberId}`)
    .then((res) => res)
    .catch((err) => err)
}

const myMainPageApi = async (): Promise<AxiosResponse> => {
  return authApi
    .get(`${baseUrl}/commons/main`)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => error)
}

// 숲 조회
const forestGetApi = async (
  data: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return authApi
    .get(`${forestBaseUrl}`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 나무 리스트
const treeList = async (forestId: number, data: AxiosRequestConfig) => {
  return authApi
    .get(`${forestBaseUrl}/${forestId}/tree`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 나무 상세
const treeDetail = async (treeId: string) => {
  return authApi
    .get(`${treeApiUrl(treeId)}`)
    .then((res) => res)
    .catch((err) => err)
}

// 일정 조회
const getSchedule = async (treeId: string) => {
  try {
    return await authApi.get(`${scheduleUrl(treeId)}`) // 오류가 없을 경우 응답을 반환
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 가지 추가
const branchCreate = async (treeId: string, data: any) => {
  return authApi
    .post(`${treeApiUrl(treeId)}/branch`, data)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch()
}

// 그룹원 가지 일괄등록
const branchGroupCreate = async (groupId: any, data: any) => {
  return authApi
    .post(`${baseUrl}/group/${groupId}/branch`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 씨앗 추가
const seedCreate = async (treeId: string, branchId: string, data: any) => {
  return authApi
    .post(`${branchApiUrl(treeId, branchId)}/seed`, data)
    .then((res) => res)
    .catch((err) => console.log(err))
}

// 씨앗 이름 수정
const seedNameUpdate = async (
  treeId: string,
  branchId: string,
  seedId: string,
  data: any,
) => {
  authApi
    .patch(`${seedApiUrl(treeId, branchId, seedId)}`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}
// 씨앗 삭제
const seedDelete = async (treeId: string, branchId: string, seedId: string) => {
  authApi
    .delete(`${seedApiUrl(treeId, branchId, seedId)}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export {
  myMainPageApi,
  mainPageApi,
  forestGetApi,
  treeList,
  treeDetail,
  branchCreate,
  branchGroupCreate,
  seedCreate,
  seedNameUpdate,
  seedDelete,
  getSchedule,
}
