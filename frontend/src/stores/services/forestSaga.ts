import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { PayloadAction } from '@reduxjs/toolkit'
import { FetchUserDataResponse } from '@/types/UserType'
import { forestGetApi, treeDetail, treeList } from '@/apis'
import {
  getForestData,
  getTreeDetailData,
  getTreesData,
  saveForestData,
  saveTreeDetailData,
  saveTreesData,
  selectedInfoData,
} from '@/stores/features/forestSlice'

function* getForestSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<any> = yield call(forestGetApi)
  if (response.data.data.forests) {
    yield put(saveForestData(response.data.data.forests))
  }
}

function* getTreesSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const { forestId, startedAt, endedAt } = action.payload
  const response: AxiosResponse<any> = yield call(
    treeList,
    forestId,
    startedAt,
    endedAt,
  )
  if (response.data.data.trees) {
    yield put(saveTreesData(response.data.data.trees))
  }
}

function* getTreeDetailSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const treeId = action.payload
  const response: AxiosResponse<any> = yield call(treeDetail, treeId)
  if (response.data.data) {
    yield put(saveTreeDetailData(response.data.data))
  }
}

function* getTreeSelectSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  let newSum = 0
  let newFin = 0
  let totalPercent = 0
  const detailData = action.payload
  detailData.branches.forEach((branch: any) => {
    newSum += branch.totalBudCount
    newFin += branch.completedBudCount
  })
  if (newSum > 0) {
    totalPercent = (newFin / newSum) * 100
  } else {
    totalPercent = 0
  }
  const branchNames: any = detailData.branches.map(
    (branch: any) => branch.branchName,
  )
  const branchTotalCount: any = detailData.branches.map(
    (branch: any) => branch.totalBudCount,
  )
  const branchDoneCount: any = detailData.branches.map(
    (branch: any) => branch.completedBudCount,
  )
  const notYet = detailData.branches.map((branch: any) =>
    branch.totalBudCount > 0
      ? branch.totalBudCount - branch.completedBudCount
      : 0,
  )
  const saveData = {
    totalPercent,
    branchNames,
    branchTotalCount,
    branchDoneCount,
    notYet,
  }
  yield put(selectedInfoData(saveData))
}

export function* watchForestData() {
  yield takeLatest(getForestData.type, getForestSaga)
  yield takeLatest(getTreesData.type, getTreesSaga)
  yield takeLatest(getTreeDetailData.type, getTreeDetailSaga)
  yield takeLatest(saveTreeDetailData.type, getTreeSelectSaga)
}
