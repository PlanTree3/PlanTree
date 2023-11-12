import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
  SelectEffect,
  select,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { PayloadAction } from '@reduxjs/toolkit'
import { FetchUserDataResponse } from '@/types/UserType'
import {
  addBranches,
  addBuds,
  addSeeds,
  finishedBuds,
  finishRejectBuds,
  getBranchData,
  moveBuds,
  removeBuds,
  removeSeeds,
  saveBranches,
  saveBuds,
} from '@/stores/features/branchSlice.ts'
import {
  branchCreate,
  budComplete,
  budCompleteCancel,
  budCreate,
  budDayUpdate,
  budDelete,
  getSchedule,
  seedCreate,
} from '@/apis'

import { getTreeId } from '@/stores/selectors'

function* getBranchDataSaga(): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    const treeId: any = yield select(getTreeId)
    const response: any = yield call(getSchedule, treeId)
    console.log(response)
    const { branches } = response.data.data
    const { buds } = response.data.data
    // const seeds = []
    yield put(saveBranches(branches))
    // yield put(saveSeeds(seeds))
    yield put(saveBuds(buds))
  } catch (error) {
    /* empty */
  }
}

function* addBudsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    const treeId: any = yield select(getTreeId)
    const { branchId } = action.payload.createdItem
    const data = {
      name: action.payload.createdItem.budName,
      dayOfWeek: action.payload.createdItem.dayOfWeek,
    }
    console.log(data)
    const response: AxiosResponse<any> = yield call(
      budCreate,
      treeId,
      branchId,
      data,
    )
    if (response.data) {
      // 응답 데이터가 있으면 뭔가를 합니다.
      // 예를 들어, Redux store를 업데이트할 수 있습니다.
      // yield put({ type: 'ADD_BUD_SUCCESS', payload: response.data });
    }
  } catch (error) {
    // 에러를 처리합니다.
    // 예를 들어, 에러 메시지를 store에 저장할 수 있습니다.
    // yield put({ type: 'ADD_BUD_FAILURE', payload: error });
  }
}

function* addSeedsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log('씨앗 사가 작동 확인', action.payload)
  const { branchId } = action.payload.createdItem
  const treeId: any = yield select(getTreeId)
  const data = {
    name: action.payload.createdItem.seedName,
  }
  const response: AxiosResponse<any> = yield call(
    seedCreate,
    treeId,
    branchId,
    data,
  )
  if (response.data) {
    // TODO document why this block is empty
  }
}

function* addBranchesSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  // const treeId: any = yield select(getTreeId)
  // 테스트용 나무 아이디 사용
  const treeId = '9839fc1d-843c-491c-9a71-5c1b8efb22c7'
  const data = {
    name: action.payload.createdItem.branchName,
    color: action.payload.createdItem.color,
  }
  const response: AxiosResponse<any> = yield call(branchCreate, treeId, data)
  console.log('응답', response)
  if (response.data) {
    const result = response.data.data
    console.log(result)
    yield put(getBranchData())
  }
}

function* removeBudsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  const treeId: any = yield select(getTreeId)
  const { branchId } = action.payload.createdItem
  const { budId } = action.payload.createdItem
  const response: AxiosResponse<unknown> = yield call(
    budDelete,
    treeId,
    branchId,
    budId,
  )
  if (response.data) {
    // TODO document why this block is empty
  }
}

function* removeSeedsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  const treeId: any = yield select(getTreeId)
  const { branchId } = action.payload.createdItem
  const { budId } = action.payload.createdItem
  const response: AxiosResponse<unknown> = yield call(
    seedCreate,
    treeId,
    branchId,
    budId,
  )
  if (response.data) {
    // TODO document why this block is empty
  }
}

function* moveBudsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    const treeId: any = yield select(getTreeId)
    const { branchId } = action.payload.createdItem
    const { budId } = action.payload.createdItem
    const data = {
      dayOfWeek: action.payload.createdItem.dayOfWeek,
    }
    console.log(action.payload, data)
    const response: AxiosResponse<any> = yield call(
      budDayUpdate,
      treeId,
      branchId,
      budId,
      data,
    )
    if (response.data) {
      /* empty */
    }
  } catch (error) {
    /* empty */
  }
}

function* finishBudsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    const treeId: any = yield select(getTreeId)
    const { branchId } = action.payload.createdItem
    const { budId } = action.payload.createdItem
    console.log(action.payload, treeId, branchId, budId)
    const data = {
      dayOfWeek: action.payload.createdItem.dayOfWeek.replace('_FINISH', ''),
    }
    const response: AxiosResponse<any> = yield call(
      budComplete,
      treeId,
      branchId,
      budId,
      data,
    )
    if (response.data) {
      // TODO document why this block is empty
    }
  } catch (error) {
    /* empty */
  }
}

function* finishRejectBudsSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    const treeId: any = yield select(getTreeId)
    const { branchId } = action.payload.createdItem
    const { budId } = action.payload.createdItem
    console.log(action.payload)
    const data = {
      dayOfWeek: action.payload.createdItem.dayOfWeek,
    }
    const response1: AxiosResponse<any> = yield call(
      budCompleteCancel,
      treeId,
      branchId,
      budId,
      data,
    )
    if (response1.data) {
      // TODO document why this block is empty
    }
  } catch (error) {
    /* empty */
  }
}

export function* watchBranchData() {
  yield takeLatest(getBranchData.type, getBranchDataSaga)
  yield takeLatest(addBuds.type, addBudsSaga)
  yield takeLatest(addSeeds.type, addSeedsSaga)
  yield takeLatest(addBranches.type, addBranchesSaga)
  yield takeLatest(removeBuds.type, removeBudsSaga)
  yield takeLatest(removeSeeds.type, removeSeedsSaga)
  yield takeLatest(moveBuds.type, moveBudsSaga)
  yield takeLatest(finishedBuds.type, finishBudsSaga)
  yield takeLatest(finishRejectBuds.type, finishRejectBudsSaga)
}
