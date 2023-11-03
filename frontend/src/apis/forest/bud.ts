// import { authApi } from '@/apis'

import { branchApiUrl, budApiUrl } from '@/utils'
import { authApi } from '@/apis'

// 봉오리 추가
const budCreate = async (
  forestId: number,
  treeId: number,
  branchId: number,
  data: unknown,
) => {
  authApi
    .post(`${branchApiUrl(forestId, treeId, branchId)}/bud`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}
// 봉오리 dnd
const budDayUpdate = async (
  forestId: number,
  treeId: number,
  branchId: number,
  budId: number,
  data: unknown,
) => {
  authApi
    .patch(`${budApiUrl(forestId, treeId, branchId, budId)}/day`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 이름 변경
const budNameUpdate = async (
  forestId: number,
  treeId: number,
  branchId: number,
  budId: number,
  data: unknown,
) => {
  authApi
    .patch(`${budApiUrl(forestId, treeId, branchId, budId)}/name`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 완료
const budComplete = async (
  forestId: number,
  treeId: number,
  branchId: number,
  budId: number,
) => {
  authApi
    .patch(`${budApiUrl(forestId, treeId, branchId, budId)}/complete`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 완료 취소
const budCompleteCancel = async (
  forestId: number,
  treeId: number,
  branchId: number,
  budId: number,
) => {
  authApi
    .patch(`${budApiUrl(forestId, treeId, branchId, budId)}/undo-complete`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 봉오리 삭제
const budDelete = async (
  forestId: number,
  treeId: number,
  branchId: number,
  budId: number,
) => {
  authApi
    .delete(`${budApiUrl(forestId, treeId, branchId, budId)}`)
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
}
