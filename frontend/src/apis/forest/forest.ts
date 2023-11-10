import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authApi } from "@/apis";
import { branchApiUrl, scheduleUrl, seedApiUrl, treeApiUrl } from "@/utils";

const baseUrl = 'api/forest-service'
const forestBaseUrl = 'api/forest-service/forest'

// 메인페이지
const mainPageApi = async (memberId: string): Promise<AxiosResponse> => {
  return authApi
    .get(`${baseUrl}/main/${memberId}`)
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
const treeDetail = async (forestId: number, treeId: number) => {
  return authApi
    .get(`${treeApiUrl(forestId, treeId)}`)
    .then((res) => res)
    .catch((err) => err)
}


// 일정 조회
const getSchedule = async (treeId: string) => {
  try {
    return await authApi.get(`${scheduleUrl(treeId)}`); // 오류가 없을 경우 응답을 반환
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 가지 추가
const branchCreate = async (
  treeId: string,
  data: any,
) => {
  return authApi
    .post(`${treeApiUrl(treeId)}/branch`, data)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch()
}

// 그룹원 가지 일괄등록
const branchGroupCreate = async (groupId: string, data: unknown) => {
  authApi
    .post(`${baseUrl}/group/${groupId}/branch`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 씨앗 추가
const seedCreate = async (
  forestId: number,
  treeId: number,
  branchId: number,
  data: unknown,
) => {
  authApi
    .post(`${branchApiUrl(forestId, treeId, branchId)}/seed`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 씨앗 이름 수정
const seedNameUpdate = async (
  forestId: number,
  treeId: number,
  branchId: number,
  seedId: number,
  data: unknown,
) => {
  authApi
    .patch(`${seedApiUrl(forestId, treeId, branchId, seedId)}`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}
// 씨앗 삭제
const seedDelete = async (
  forestId: number,
  treeId: number,
  branchId: number,
  seedId: number,
) => {
  authApi
    .delete(`${seedApiUrl(forestId, treeId, branchId, seedId)}`)
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
