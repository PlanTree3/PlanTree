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
import { questCheck, questGiveUp, userQuestList } from '@/apis'
import {
  checkQuest,
  deleteQuest,
  getQuestData,
  saveQuestData,
} from '@/stores/features/questSlice.ts'
import { role } from '@/stores/selectors.ts'

function* getQuestDataSaga(): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const userType: any = yield select(role)
  const reUserType = userType.toLowerCase()
  const response: AxiosResponse<any> = yield call(userQuestList, reUserType)
  console.log(response)
  if (response.data) {
    console.log(response.data.data)
    yield put(saveQuestData(response.data.data))
  }
}
function* deleteQuestSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const questId = action.payload
  yield call(questGiveUp, questId)
  yield put(getQuestData())
}
function* checkQuestSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const questId = action.payload
  yield call(questCheck, questId)
  yield put(getQuestData())
}
export function* watchQuestData() {
  yield takeLatest(getQuestData.type, getQuestDataSaga)
  yield takeLatest(deleteQuest.type, deleteQuestSaga)
  yield takeLatest(checkQuest.type, checkQuestSaga)
}
