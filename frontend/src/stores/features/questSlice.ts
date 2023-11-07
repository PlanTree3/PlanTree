import { createSlice } from '@reduxjs/toolkit'

const defaultQuestList = [
  {
    questId: 1,
    questTitle: '아리스는 용사입니다.',
    questContent: '빛 이 여',
    createdAt: '2023-11-06',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 2,
    questTitle: '일일 퀘스트 입니다!',
    questContent: '보상으로 이 케이크를 드리겠습니다.',
    createdAt: '2023-11-06',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 3,
    questTitle: '왕녀여',
    questContent: '빛이여는 필살기가 아닌 평타로 써야 합니다.',
    createdAt: '2023-11-05',
    isChecked: true,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 4,
    questTitle: '오늘의 저는',
    questContent: '명속성 광역 딜러',
    createdAt: '2023-11-04',
    isChecked: true,
    isConfirmed: true,
    isFinished: false,
  },
  {
    questId: 5,
    questTitle: '그렇습니다',
    questContent: '저의 모국어는 java입니다',
    createdAt: '2023-11-03',
    isChecked: true,
    isConfirmed: true,
    isFinished: false,
  },
  {
    questId: 6,
    questTitle: '다른 이름으로는 유스티아나 폰 아스트라이아',
    questContent: '폐하의 이름을 사칭하는 괴씸한 놈, 죽어라',
    createdAt: '2023-11-02',
    isChecked: true,
    isConfirmed: true,
    isFinished: true,
  },
]
const initialState = {
  questsList: defaultQuestList,
}

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    checkQuest: (state, action) => {
      const questId = action.payload
      const quest = state.questsList.find((idx: any) => idx.questId === questId)
      if (quest) {
        quest.isChecked = true
      }
    },
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
  },
})

export const { checkQuest, confirmQuest, deleteQuest} = questSlice.actions
export default questSlice.reducer
