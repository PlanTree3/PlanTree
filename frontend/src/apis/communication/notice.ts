import { authApi } from '@/apis'

const baseUrl = 'api/communication-service'

// 가정통신문 생성
const groupNoticeCreate = async (groupId: number, data: unknown) => {
  return authApi
    .post(`${baseUrl}/group/${groupId}/notice`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 리스트 조회(학생, 부모)
const noticeList = async () => {
  try {
    const res = await authApi.get(`${baseUrl}/notice`)
    console.log(res.data)

    return res.data
  } catch (err) {
    console.log(err)

    // 에러 처리
    return err
  }
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

// 가정통신문 수정
const groupNoticeUpdate = async (
  groupId: number,
  noticeId: number,
  data: unknown,
) => {
  return authApi
    .patch(`${baseUrl}/group/${groupId}/notice/${noticeId}`, data)
    .then((res) => res)
    .catch((err) => err)
}

export {
  groupNoticeCreate,
  noticeList,
  noticeDetail,
  groupNoticeList,
  groupNoticeUpdate,
}
