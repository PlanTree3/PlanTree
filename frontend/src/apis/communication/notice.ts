import { authApi } from '@/apis'

const baseUrl = 'api/communication-service'

// 가정통신문 생성

// 가정통신문 리스트 조회(학생, 부모)
const noticeList = async () => {
  return authApi
    .get(`${baseUrl}/notice`)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 상세 조회
const noticeDetail = async (noticeId: number) => {
  return authApi
    .get(`${baseUrl}/notice/${noticeId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 내 가정통신문 리스트 조회
const groupNoticeList = async (groupId: number) => {
  return authApi
    .get(`${baseUrl}/group/${groupId}/notice`)
    .then((res) => res)
    .catch((err) => err)
}

export { noticeList, noticeDetail, groupNoticeList }
