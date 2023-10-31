import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { authApi } from '@/apis'
import { branchApiUrl, seedApiUrl, treeApiUrl } from '@/utils'

const baseUrl = 'api/forest-service/'
const forestBaseUrl = 'api/forest-service/forest'

// 메인페이지
const mainPageApi = async (memberId: string): Promise<AxiosResponse> => {
  return authApi
    .get(`${baseUrl}/main/${memberId}`)
    .then((res) => res)
    .catch((err) => err)
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

// 가지 추가
const branchCreate = async (
  forestId: number,
  treeId: number,
  data: unknown,
) => {
  authApi
    .post(`${treeApiUrl(forestId, treeId)}/branch`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
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
  mainPageApi,
  forestGetApi,
  branchCreate,
  branchGroupCreate,
  seedCreate,
  seedNameUpdate,
  seedDelete,
}
