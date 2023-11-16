import { authApi } from '@/apis'
// import { scheduleUrl } from '@/utils'

const baseUrl = 'api/common-service'

// 그룹 퀘스트 생성
const groupQuestCreate = async (data: unknown) => {
  authApi
    .post(`${baseUrl}/group-quest`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 둥지 퀘스트 생성
const nestQuestCreate = async (data: unknown) => {
  authApi
    .post(`${baseUrl}/nest-quest`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 퀘스트 리스트 조회
const groupQuestList = async (groupId: number) => {
  return authApi
    .get(`${baseUrl}/group/${groupId}/quest`)
    .then((res) => res)
    .catch((err) => err)
}

// 둥지 퀘스트 리스트 조회
const nestQuestList = async (nestId: number) => {
  return authApi
    .get(`${baseUrl}/nest/${nestId}/quest`)
    .then((res) => res)
    .catch((err) => err)
}

// 학생 전체 퀘스트 리스트 조회
const userQuestList = async (role: string) => {
  return authApi
    .get(`${baseUrl}/quest/${role}`)
    .then((res) => res)
    .catch((err) => err)
}

// 퀘스트 확인
const questCheck = async (questId: string) => {
  try {
    return await authApi.patch(`${baseUrl}/quest/${questId}/check`)
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 퀘스트 수정
const questCorrection = async (questId: string, data: any) => {
  try {
    return await authApi.patch(`${baseUrl}/quest/${questId}/check`, data)
  } catch (error) {
    console.error(error)
    throw error
  }
}
// 퀘스트 수락
const questAccept = async (questId: string, data: any) => {
  authApi
    .patch(`${baseUrl}/quest/${questId}/accept`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 퀘스트 포기
const questGiveUp = async (questId: string, data: any) => {
  authApi
    .patch(`${baseUrl}/quest/${questId}/giveup`, data)
    .then((res) => console.log(res))
    .catch((err) => err)
}

// 퀘스트 성공 요청
const questSuccessRequest = async (questId: string, data: any) => {
  authApi
    .patch(`${baseUrl}/quest/${questId}/success-request`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 퀘스트 성공 수락
const questSuccessAccept = async (questId: number, data: any) => {
  authApi
    .patch(`${baseUrl}/quest/${questId}/success-accept`, data)
    .then((res) => res)
    .catch((err) => err)
}

export {
  groupQuestCreate,
  nestQuestCreate,
  groupQuestList,
  nestQuestList,
  userQuestList,
  questCheck,
  questAccept,
  questGiveUp,
  questSuccessRequest,
  questSuccessAccept,
  questCorrection,
}
