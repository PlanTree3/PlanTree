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
  storeWeeklyData,
} from '@/stores/features/mainSlice.ts'

function* getMainSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log('여기는 들어옴')
  const response: AxiosResponse<any> = yield call(myMainPageApi)
  console.log(response)
  if (response.data) {
    const idName = {
      treeId: response.data.treeId,
      treeName: response.data.treeName,
    }
    yield put(storeIdName(idName))
    yield put(storeWeeklyData(response.data.days))
  }
}

export function* watchMainData() {
  yield takeLatest(getMainData.type, getMainSaga)
}
