export interface ItemState {
  budId: number
  budName: string
  dayOfWeek: string
  // comments: Comment
}
export interface Comment {
  commentId: number
  userId: number
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
  id: number
  budName: string
  index: number
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  dayOfWeek: string
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
  MONDAY: '월요일',
  TUESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  MONDAY_FINISH: '월요일 끝',
  TUESDAY_FINISH: '화요일 끝',
  WEDNESDAY_FINISH: '수요일 끝',
  THURSDAY_FINISH: '목요일 끝',
  FRIDAY_FINISH: '금요일 끝',
}

export const DAY_NAMES: { [key: string]: string } = {
  '1': '월요일',
  '2': '화요일',
  '3': '수요일',
  '4': '목요일',
  '5': '금요일',
}

export const ITEM_TYPE = 'BOARD_VIEW'
