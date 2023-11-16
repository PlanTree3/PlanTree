import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { FetchUserDataResponse } from '@/types/UserType'
import { myMainPageApi } from '@/apis'
import {
  getMainData,
  storeIdName,
  storeScoreData,
  storeWeeklyData,
} from '@/stores/features/mainSlice.ts'

function* getMainSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<any> = yield call(myMainPageApi)
  if (response.data) {
    const idName = {
      treeId: response.data.data.treeId,
      treeName: response.data.data.treeName,
    }
    yield put(storeIdName(idName))
    yield put(storeWeeklyData(response.data.data.days))
    yield put(storeScoreData(response.data.data.score))
  }
}

export function* watchMainData() {
  yield takeLatest(getMainData.type, getMainSaga)
}
