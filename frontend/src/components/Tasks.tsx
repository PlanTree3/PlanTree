import { COLUMN_NAMES, CommentType } from '@/types/DnDType'

const { DEFAULT, MONDAY, TUESDAY, WEDNESDAY, FRIDAY_FINISH } = COLUMN_NAMES
export const branchList = [
  { branchId: 1, branchName: 'ssafy' },
  { branchId: 2, branchName: '삼성' },
]
// eslint-disable-next-line @typescript-eslint/naming-convention
export const comments_1: CommentType[] = [
  {
    commentId: 1,
    userId: 101,
    userName: '예지',
    title: 'Interesting Article',
    text: 'This article provides a lot of great insights about the topic.',
  },
  {
    commentId: 2,
    userId: 102,
    userName: '연재',
    title: 'Question',
    text: 'I have a question about one of the points mentioned. Could someone clarify?'
  },
  {
    commentId: 3,
    userId: 103,
    userName: '김연재',
    title: 'Great Read!',
    text: 'Enjoyed reading this, very informative and easy to understand.',
  },
]
// eslint-disable-next-line @typescript-eslint/naming-convention
export const comments_2: CommentType[] = [
  {
    commentId: 4,
    userId: 201,
    userName: '예지',
    title: 'Helpful Resource',
    text: 'This really helped me understand the subject better, thanks!',
  },
  {
    commentId: 5,
    userId: 202,
    userName: '예지',
    title: 'Need More Information',
    text: 'I think this topic could benefit from more detailed examples.',
  },
  {
    commentId: 6,
    userId: 203,
    userName: '예지',
    title: 'Well Explained',
    text: 'The explanation is clear and straightforward, making it easy to follow.',
  },
]
export const seedsList = [
  {
    seedId: 1,
    seedName: 'Item 1',
    dayOfWeek: DEFAULT,
    branchId: 1,
    comments: null,
  },
  {
    seedId: 2,
    seedName: 'Item 2',
    dayOfWeek: DEFAULT,
    branchId: 1,
    comments: null,
  },
  {
    seedId: 3,
    seedName: 'Item 3',
    dayOfWeek: DEFAULT,
    branchId: 2,
    comments: null,
  },
  {
    seedId: 4,
    seedName: 'Item 4',
    dayOfWeek: DEFAULT,
    branchId: 2,
    comments: null,
  },
]
export const budsList = [
  { budId: 1, budName: '기정', dayOfWeek: MONDAY, comments: comments_1 },
  { budId: 2, budName: '예지', dayOfWeek: TUESDAY, comments: null },
  { budId: 3, budName: '연재', dayOfWeek: WEDNESDAY, comments: comments_2 },
  { budId: 4, budName: '영석', dayOfWeek: FRIDAY_FINISH, comments: null },
]
