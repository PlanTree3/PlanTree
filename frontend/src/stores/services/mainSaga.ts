import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { FetchUserDataResponse } from '@/types/UserType'
import { myMainPageApi } from "@/apis";
import { getMainData, storeIdName, storeWeeklyData } from "@/stores/features/mainSlice.ts";

function* getMainSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log('여기는 들어옴')
  const response: AxiosResponse<unknown> = yield call(myMainPageApi)
  console.log(response)
  if (response.data) {
    const data: any = response.data
    const idName = {
      treeId : data.treeId,
      treeName: data.treeName
    }
    const days = data.days
    yield put(storeIdName(idName))
    yield put(storeWeeklyData(days))
  }
}

export function* watchMainData() {
  yield takeLatest(getMainData.type, getMainSaga)
}
