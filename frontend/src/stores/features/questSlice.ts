import { createSlice } from '@reduxjs/toolkit'

const defaultQuestList = [
  {
    questId: 1,
    questTitle: '용사입니다.',
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
    questTitle: 'Alice',
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
    isFinished: true,
  },
  {
    questId: 7,
    questTitle: '신비한 모험의 시작',
    questContent: '모험가가 되어 떠나요.',
    createdAt: '2023-10-31',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 8,
    questTitle: '숲 속의 불빛을 찾아서',
    questContent: '어둠 속에서 길을 잃지 마세요.',
    createdAt: '2023-10-30',
    isChecked: false,
    isConfirmed: true,
    isFinished: false,
  },
  {
    questId: 9,
    questTitle: '저주받은 성',
    questContent: '고대의 비밀을 풀 준비가 되었나요?',
    createdAt: '2023-10-29',
    isChecked: true,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 10,
    questTitle: '용사의 검',
    questContent: '전설 속 검을 찾아 나서는 여행.',
    createdAt: '2023-10-28',
    isChecked: true,
    isConfirmed: true,
    isFinished: true,
  },
  {
    questId: 11,
    questTitle: '[공통] 3개의 퀘스트를 완료하세요.',
    questContent: '퀘스트 목록에서 3개의 퀘스트를 선택하고 완료하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 12,
    questTitle: '[공통] 10개의 캐릭터를 등록하세요.',
    questContent: '캐릭터 목록에서 10개의 캐릭터를 선택하고 등록하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 13,
    questTitle: '[공통] 1개의 에피소드를 완료하세요.',
    questContent: '에피소드 목록에서 1개의 에피소드를 선택하고 완료하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 14,
    questTitle: '[공통] 1개의 이벤트에 참여하세요.',
    questContent: '이벤트 목록에서 1개의 이벤트를 선택하고 참여하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 15,
    questTitle: '[일일] 10회의 전투를 완료하세요.',
    questContent: '스토리, 이벤트, 도전과제 등에서 10회의 전투를 완료하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 16,
    questTitle: '[일일] 5개의 캐릭터를 레벨업하세요.',
    questContent: '캐릭터 목록에서 5개의 캐릭터를 선택하고 레벨을 올리세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 17,
    questTitle: '[일일] 1개의 캐릭터를 각성하세요.',
    questContent:
      '캐릭터 목록에서 각성 가능한 캐릭터를 선택하고 각성을 진행하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 18,
    questTitle: '[일일] 1개의 스킬을 강화하세요.',
    questContent: '캐릭터 목록에서 강화 가능한 스킬을 선택하고 강화하세요.',
    createdAt: '2023-11-07',
    isChecked: false,
    isConfirmed: false,
    isFinished: false,
  },
  {
    questId: 19,
    questTitle: '[공통] 20분 동안 게임을 플레이하세요.',
    questContent: '게임을 켜고 20분 동안 플레이하세요.',
    createdAt: '2023-11-07',
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

export const { checkQuest, confirmQuest, deleteQuest } = questSlice.actions
export default questSlice.reducer
