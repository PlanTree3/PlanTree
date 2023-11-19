import { createSlice } from '@reduxjs/toolkit'

interface QuestType {
  questId: string
  title: string
  content: string
  issuerType: string
  issuerName: string
  acceptorName: string
  checked: boolean
  confirmed: boolean
  finished: boolean
  waiting: boolean
  createdAt: string
}

const defaultQuestList: QuestType[] = [
  {
    questId: 'abcd-abcd-abcd-abcd',
    title: '그렇습니다',
    content: '저의 모국어는 java입니다',
    createdAt: '2023-11-03',
    checked: true,
    confirmed: true,
    finished: false,
    issuerType: 'TEACHER',
    issuerName: '티이처',
    acceptorName: '123123',
    waiting: false,
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
      console.log(action.payload)
    },
    checkQuest: (state, action) => {
      const questId = action.payload
      const quest = state.questsList.find((idx: any) => idx.questId === questId)
      if (quest) {
        quest.checked = true
      }
    },
    correctionQuest: (_state, _action) => {},
    confirmQuest: (state, action) => {
      const questId = action.payload
      const quest = state.questsList.find((idx: any) => idx.questId === questId)
      if (quest && !quest.confirmed) {
        quest.confirmed = true
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
