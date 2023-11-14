import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { FetchUserDataResponse } from '@/types/UserType'
import {
  loginCheck,
  saveUserData,
  logOutCheck,
  successUserLogout,
} from '@/stores/features/userSlice'
import { userInfo, userLogout } from '@/apis/member/user'

function* fetchUserDataSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<unknown> = yield call(userInfo)
  if (response) {
    console.log('saga의: ', response.data)
    yield put(saveUserData(response.data))
  }
}

function* fetchUserLogoutSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  yield put(successUserLogout())
  yield call(userLogout)
}

export function* watchFetchUserData() {
  yield takeLatest(loginCheck.type, fetchUserDataSaga)
  yield takeLatest(logOutCheck.type, fetchUserLogoutSaga)
}
