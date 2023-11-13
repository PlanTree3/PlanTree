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
import { getForestData, saveForestData } from '@/stores/features/forestSlice'

function* getForestSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<any> = yield call(myMainPageApi)
  console.log(response)
  if (response.data.forests) {
    yield put(saveForestData(response.data.forests))
  }
}

export function* watchMainData() {
  yield takeLatest(getForestData.type, getForestSaga)
}
