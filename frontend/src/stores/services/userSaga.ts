import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import { FetchUserDataResponse } from '@/types/UserType'
// import { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import {
  fetchUserData,
  fetchUserDataSuccess,
  fetchUserLogout,
  successUserLogout,
} from '@/stores/features/userSlice'
import { fetchUserDataAPI, LogoutAPI } from '@/apis/userApi'
import { handleTokenError } from '@/stores/services/tokenEventSaga'

function* fetchUserDataSaga(): Generator<
  // action: PayloadAction<FetchUserDataPayload>,
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const maxRetries = 2
  let retries = 0
  while (retries < maxRetries) {
    try {
      const response: AxiosResponse<unknown> = yield call(fetchUserDataAPI)
      if (response.data) {
        yield put(fetchUserDataSuccess(response.data))
        break
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield* handleTokenError(error)
        retries += 1
      } else {
        console.error(error)
        break
      }
    }
  }
}
function* fetchUserLogoutSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<unknown> = yield call(LogoutAPI)
  if (response) {
    yield put(successUserLogout())
    sessionStorage.clear()
  }
}

export default function* watchFetchUserData() {
  yield takeLatest(fetchUserData.type, fetchUserDataSaga)
  yield takeLatest(fetchUserLogout.type, fetchUserLogoutSaga)
}
