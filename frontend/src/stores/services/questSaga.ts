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
  questAccept,
  questCheck,
  questCorrection,
  questGiveUp,
  questSuccessAccept,
  questSuccessRequest,
  userQuestList,
} from '@/apis'
import {
  checkQuest,
  confirmQuest,
  correctionQuest,
  deleteQuest,
  getQuestData,
  saveQuestData,
  successAcceptQuest,
  successRequestQuest,
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
  if (response.data) {
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
  const data = {
    questId,
  }
  yield call(questGiveUp, questId, data)
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

function* confirmQuestSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const questId = action.payload
  const data = {
    questId,
  }
  yield call(questAccept, questId, data)
  yield put(getQuestData())
}

function* correctionQuestSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const questId = action.payload
  const data = {
    questId,
  }
  yield call(questCorrection, questId, data)
  yield put(getQuestData())
}

function* successAcceptSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const questId = action.payload
  const data = {
    questId,
  }
  yield call(questSuccessAccept, questId, data)
  yield put(getQuestData())
}

function* successRequestSaga(
  action: PayloadAction<any>,
): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const questId = action.payload
  const data = {
    questId,
  }
  yield call(questSuccessRequest, questId, data)
  yield put(getQuestData())
}
export function* watchQuestData() {
  yield takeLatest(getQuestData.type, getQuestDataSaga)
  yield takeLatest(deleteQuest.type, deleteQuestSaga)
  yield takeLatest(checkQuest.type, checkQuestSaga)
  yield takeLatest(confirmQuest.type, confirmQuestSaga)
  yield takeLatest(correctionQuest.type, correctionQuestSaga)
  yield takeLatest(successAcceptQuest.type, successAcceptSaga)
  yield takeLatest(successRequestQuest.type, successRequestSaga)
}
