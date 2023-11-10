import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
  SelectEffect,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { FetchUserDataResponse } from '@/types/UserType'
import {
  addBranches,
  addBuds,
  addSeeds,
  getBranchData, moveBuds,
  removeBuds,
  removeSeeds, saveBranches, saveBuds, saveSeeds
} from "@/stores/features/branchSlice.ts"
import { branchCreate, budCreate, budDayUpdate, getSchedule, seedCreate } from "@/apis";
import { PayloadAction } from "@reduxjs/toolkit"
import { select } from 'redux-saga/effects'
import { getTreeId } from '@/stores/selectors'

function* getBranchDataSaga(): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    // const treeId = yield select(getTreeId)
    console.log("일단 사가 실행됨??")
    const treeId = '9839fc1d-843c-491c-9a71-5c1b8efb22c7'
    const response: any = yield call(getSchedule, treeId)
    console.log(response)
    const branches = response.data.data.branches
    const buds = response.data.data.buds
    // const seeds = []
    yield put(saveBranches(branches))
    // yield put(saveSeeds(seeds))
    yield put(saveBuds(buds))
  } catch (error) {
  }
}

function* addBudsSaga(action: PayloadAction<any>): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  try {
    const treeId: string = yield select(getTreeId)
    const data: any = action.payload; // 액션에서 데이터를 추출합니다.
    const response: AxiosResponse<any> = yield call(budCreate, treeId, data)

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

function* addSeedsSaga(action: PayloadAction<any>): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  const response: AxiosResponse<unknown> = yield call(seedCreate, )
  if (response.data) {
  }
}

function* addBranchesSaga(action: PayloadAction<any>): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  // const treeId: any = yield select(getTreeId)
  // 테스트용 나무 아이디 사용
  const treeId = '9839fc1d-843c-491c-9a71-5c1b8efb22c7'
  const data = {
    name:  action.payload.createdItem.branchName,
    color: action.payload.createdItem.color
  }
  const response: AxiosResponse<any> = yield call(branchCreate, treeId, data)
  console.log("응답", response)
  if (response.data) {
    const result = response.data.data
    console.log(result)
    yield put(getBranchData())
  }
}

function* removeBudsSaga(action: PayloadAction<any>): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  // const response: AxiosResponse<unknown> = yield call(seedCreate, )
  // if (response.data) {
  // }
}

function* removeSeedsSaga(action: PayloadAction<any>): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  // const response: AxiosResponse<unknown> = yield call(seedCreate, )
  // if (response.data) {
  // }
}

function* moveBudsSaga(action: PayloadAction<any>): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log(action.payload)
  // const response: AxiosResponse<unknown> = yield call(budDayUpdate, )
  // if (response.data) {
  // }
}


export function* watchBranchData() {
  yield takeLatest(getBranchData.type, getBranchDataSaga)
  yield takeLatest(addBuds.type, addBudsSaga)
  yield takeLatest(addSeeds.type, addSeedsSaga)
  yield takeLatest(addBranches.type, addBranchesSaga)
  yield takeLatest(removeBuds.type, removeBudsSaga)
  yield takeLatest(removeSeeds.type, removeSeedsSaga)
  yield takeLatest(moveBuds.type, moveBudsSaga)
}
