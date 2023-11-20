import { AxiosResponse } from 'axios'
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
      return response
    })
    .catch((error) => error)
}

// 숲 조회
const forestGetApi = async (): Promise<AxiosResponse> => {
  return authApi
    .get(`${forestBaseUrl}`)
    .then((res) => res)
    .catch((err) => err)
}

// 타인의 숲 조회
const studentForestGetApi = async (
  memberId: string,
): Promise<AxiosResponse> => {
  return authApi
    .get(`${forestBaseUrl}/${memberId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 나무 리스트
const treeList = async (
  forestId: string,
  startedAt: string,
  endedAt: string,
) => {
  return authApi
    .get(
      `${forestBaseUrl}/${forestId}/tree?startedAt=${startedAt}&endedAt=${endedAt}`,
    )
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
    return await authApi.get(`${scheduleUrl(treeId)}`)
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
    .then((res) => res)
    .catch((err) => console.log(err))
}

export {
  myMainPageApi,
  mainPageApi,
  forestGetApi,
  studentForestGetApi,
  treeList,
  treeDetail,
  branchCreate,
  branchGroupCreate,
  seedCreate,
  seedNameUpdate,
  seedDelete,
  getSchedule,
}
