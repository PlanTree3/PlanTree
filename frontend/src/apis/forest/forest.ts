import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { authApi } from '@/apis'

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
const branchCreate = async (forestId: number, treeId: number) => {
  authApi
    .post(`${forestBaseUrl}/${forestId}/tree/${treeId}/branch`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 그룹원 가지 일괄등록
const branchGroupCreate = async (groupId: string) => {
  authApi
    .post(`${baseUrl}/group/${groupId}/branch`)
    .then((res) => res)
    .catch((err) => err)
}

// 씨앗 추가
const seedCreate = async (
  forestId: number,
  treeId: number,
  branchId: number,
) => {
  authApi
    .post(`${forestBaseUrl}/${forestId}/tree/${treeId}/branch/${branchId}/seed`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 씨앗 이름 수정
const seedUpdate = async (
  forestId: number,
  treeId: number,
  branchId: number,
  seedId: number,
) => {
  authApi
    .patch(
      `${forestBaseUrl}/${forestId}/tree/${treeId}/branch/${branchId}/seed/${seedId}`,
    )
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
    .delete(
      `${forestBaseUrl}/${forestId}/tree/${treeId}/branch/${branchId}/seed/${seedId}`,
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export {
  mainPageApi,
  forestGetApi,
  branchCreate,
  branchGroupCreate,
  seedCreate,
  seedUpdate,
  seedDelete,
}
