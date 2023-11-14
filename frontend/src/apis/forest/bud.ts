// import { authApi } from '@/apis'

import { branchApiUrl, budApiUrl, commentApiUrl } from '@/utils'
import { authApi } from '@/apis'

// 봉오리 추가
const budCreate = async (treeId: string, branchId: string, data: any) => {
  authApi
    .post(`${branchApiUrl(treeId, branchId)}/bud`, data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
}

// 봉오리 dnd
const budDayUpdate = async (
  treeId: string,
  branchId: string,
  budId: string,
  data: any,
) => {
  authApi
    .patch(`${budApiUrl(treeId, branchId, budId)}/day`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 이름 변경
const budNameUpdate = async (
  treeId: string,
  branchId: string,
  budId: string,
  data: any,
) => {
  authApi
    .patch(`${budApiUrl(treeId, branchId, budId)}/name`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 완료
const budComplete = async (
  treeId: string,
  branchId: string,
  budId: string,
  data: any,
) => {
  authApi
    .patch(`${budApiUrl(treeId, branchId, budId)}/complete`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 완료 취소
const budCompleteCancel = async (
  treeId: string,
  branchId: string,
  budId: string,
  data: any,
) => {
  authApi
    .patch(`${budApiUrl(treeId, branchId, budId)}/undo-complete`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 삭제
const budDelete = async (treeId: string, branchId: string, budId: string) => {
  authApi
    .delete(`${budApiUrl(treeId, branchId, budId)}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 상세 조회
const detailBuds = async (treeId: string, budId: string) => {
  return authApi
    .get(`${commentApiUrl(treeId, budId)}/details`)
    .then((res) => res)
    .catch((err) => console.log(err, treeId, budId))
}

// 댓글 추가
const commentCreate = async (treeId: string, budId: string, data: any) => {
  return authApi
    .post(`${commentApiUrl(treeId, budId)}/comment`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export {
  budCreate,
  budDayUpdate,
  budNameUpdate,
  budComplete,
  budCompleteCancel,
  budDelete,
  detailBuds,
  commentCreate,
}
