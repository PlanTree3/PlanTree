import { createSlice } from '@reduxjs/toolkit'

interface QuestType {
  questId: string
  title: string
  content: string
  issuerType: string
  issuerName: string
  acceptorName: string
  isChecked: boolean
  isConfirmed: boolean
  isFinished: boolean
  isWaiting: boolean
  createdAt: string
}

const defaultQuestList: QuestType[] = [
  {
    questId: 'abcd-abcd-abcd-abcd',
    title: '그렇습니다',
    content: '저의 모국어는 java입니다',
    createdAt: '2023-11-03',
    isChecked: true,
    isConfirmed: true,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
  {
    questId: 'mmfe-gto5-1dly-m0ha',
    title: '신비한 모험의 시작',
    content: '모험가가 되어 떠나요.',
    createdAt: '2023-10-31',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
  {
    questId: 'ckji-x1xf-fu25-tglw',
    title: '숲 속의 불빛을 찾아서',
    content: '어둠 속에서 길을 잃지 마세요.',
    createdAt: '2023-10-30',
    isChecked: false,
    isConfirmed: true,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
  {
    questId: '9iy5-w214-u8ai-b88r',
    title: '저주받은 성',
    content: '고대의 비밀을 풀 준비가 되었나요?',
    createdAt: '2023-10-29',
    isChecked: true,
    isConfirmed: false,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
  {
    questId: 'xbmo-uobw-ktt7-nt6a',
    title: '용사의 검',
    content: '전설 속 검을 찾아 나서는 여행.',
    createdAt: '2023-10-28',
    isChecked: true,
    isConfirmed: true,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
  {
    questId: 'rep0-ikzo-1sdn-3qvl',
    title: '[공통] 3개의 퀘스트를 완료하세요.',
    content: '퀘스트 목록에서 3개의 퀘스트를 선택하고 완료하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
  {
    questId: '2vbg-41qa-q46i-k8se',
    title: '[공통] 1개의 에피소드를 완료하세요.',
    content: '에피소드 목록에서 1개의 에피소드를 선택하고 완료하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    isWaiting: false,
  },
]
interface QuestState {
  questsList: QuestType[]
}
const initialState: QuestState = {
  questsList: defaultQuestList,
}

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    getQuestData: () => {},
    saveQuestData: (state, action) => {
      state.questsList = action.payload
    },
    checkQuest: (state, action) => {
      const questId = action.payload
      const quest = state.questsList.find((idx: any) => idx.questId === questId)
      if (quest) {
        quest.isChecked = true
      }
    },
    correctionQuest: (_state, _action) => {},
    confirmQuest: (state, action) => {
      const questId = action.payload
      const quest = state.questsList.find((idx: any) => idx.questId === questId)
      if (quest && !quest.isConfirmed) {
        quest.isConfirmed = true
      }
    },
    deleteQuest: (state, action) => {
      state.questsList = state.questsList.filter(
        (quest) => quest.questId !== action.payload,
      )
    },
    successRequestQuest: (_state, _action) => {},
    successAcceptQuest: (_state, _action) => {},
  },
})

export const {
  getQuestData,
  saveQuestData,
  checkQuest,
  confirmQuest,
  deleteQuest,
  correctionQuest,
  successAcceptQuest,
  successRequestQuest,
} = questSlice.actions
export default questSlice.reducer
