import { AxiosRequestConfig } from 'axios'
import { treeApiUrl } from '@/utils'
import { authApi } from '@/apis'

const forestBaseUrl = 'api/forest-service/forest'

// 일정 페이지
const schedulePage = async (forestId: number, treeId: number) => {
  return authApi
    .get(`${treeApiUrl(forestId, treeId)}`)
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

// 회고 등록
const treeReviewCreate = async (
  forestId: number,
  treeId: number,
  data: unknown,
) => {
  authApi
    .post(`${treeApiUrl(forestId, treeId)}/review`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 회고 수정
const treeReviewUpdate = async (
  forestId: number,
  treeId: number,
  reviewId: number,
  data: unknown,
) => {
  authApi
    .patch(`${treeApiUrl(forestId, treeId)}/review/${reviewId}`, data)
    .then((res) => res)
    .catch((err) => err)
}

export {
  schedulePage,
  treeList,
  treeDetail,
  treeReviewCreate,
  treeReviewUpdate,
}
