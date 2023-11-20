export interface ItemState {
  budId: string
  budName: string
  dayOfWeek: string
  branchColor: string
  comments: CommentType[] | null
}
export interface CommentType {
  commentId: string
  userId: string
  userName: string
  title: string
  text: string
}
export interface ColumnProps {
  children: React.ReactNode
  className: string
  title: string
}

export interface MovableItemProps {
  branchId: string
  id: string
  idType: string
  budName: string
  commentCount: number
  index: number
  moveHandler: (dragIndex: number, hoverIndex: number) => void
  dayOfWeek: string
  branchColor: string
  effect?: string
}

export interface DragItem {
  index: number
  budName: string
}

export type ColumnName =
  | 'DEFAULT'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'MONDAY_FINISH'
  | 'TUESDAY_FINISH'
  | 'WEDNESDAY_FINISH'
  | 'THURSDAY_FINISH'
  | 'FRIDAY_FINISH'

export const COLUMN_NAMES: { [key in ColumnName]: string } = {
  DEFAULT: '',

  MONDAY: 'MON',
  MONDAY_FINISH: 'MON_FINISH',

  TUESDAY: 'TUE',
  TUESDAY_FINISH: 'TUE_FINISH',

  WEDNESDAY: 'WED',
  WEDNESDAY_FINISH: 'WED_FINISH',

  THURSDAY: 'THU',
  THURSDAY_FINISH: 'THU_FINISH',

  FRIDAY: 'FRI',
  FRIDAY_FINISH: 'FRI_FINISH',
}

export const DAY_NAMES: { [key: string]: string } = {
  '1': '월요일',
  '2': '화요일',
  '3': '수요일',
  '4': '목요일',
  '5': '금요일',
}

export const ITEM_TYPE = 'BOARD_VIEW'
