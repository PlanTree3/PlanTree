import { COLUMN_NAMES } from '@/types/DnDType'

const { DEFAULT, MONDAY, TUESDAY, WEDNESDAY, FRIDAY_FINISH } = COLUMN_NAMES

export const seedsList = [
  { seedId: 1, seedName: 'Item 1', dayOfWeek: DEFAULT, branchId: 1 },
  { seedId: 2, seedName: 'Item 2', dayOfWeek: DEFAULT, branchId: 1 },
  { seedId: 3, seedName: 'Item 3', dayOfWeek: DEFAULT, branchId: 2 },
  { seedId: 4, seedName: 'Item 4', dayOfWeek: DEFAULT, branchId: 2 },
]

export const budsList = [
  { budId: 1, budName: '기정', dayOfWeek: MONDAY },
  { budId: 2, budName: '예지', dayOfWeek: TUESDAY },
  { budId: 3, budName: '연재', dayOfWeek: WEDNESDAY },
  { budId: 4, budName: '영석', dayOfWeek: FRIDAY_FINISH },
]

export const branchList = [
  { branchId: 1, branchName: 'ssafy' },
  { branchId: 2, branchName: '삼성' },
]
