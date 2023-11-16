import { authApi } from '@/apis'

const baseUrl = 'api/communication-service/inform'

// 가정통신문 생성
const groupNoticeCreate = async (groupId: any, data: unknown) => {
  return authApi
    .post(`${baseUrl}/group/${groupId}`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 리스트 조회(학생, 부모)
const noticeList = async () => {
  try {
    const res = await authApi.get(`${baseUrl}`)
    console.log(res.data)

    return res.data
  } catch (err) {
    console.log(err)

    // 에러 처리
    return err
  }
}

// 가정통신문 상세 조회
const noticeDetail = async (noticeId: any) => {
  return authApi
    .get(`${baseUrl}/${noticeId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 그룹 내 가정통신문 리스트 조회
const groupNoticeList = async (groupId: any) => {
  return authApi
    .get(`${baseUrl}/group/${groupId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 수정 (제목, 내용)
const groupNoticeUpdate = async (noticeId: any, data: unknown) => {
  return authApi
    .patch(`${baseUrl}/${noticeId}`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 파일 추가
const noticeFileCreate = async (noticeId: any, data: unknown) => {
  return authApi
    .post(`${baseUrl}/${noticeId}/file`, data)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 파일 다운로드
const noticeFileDownload = async (noticeId: any, fileId: any) => {
  return authApi
    .get(`${baseUrl}/${noticeId}/file/${fileId}`)
    .then((res) => res)
    .catch((err) => err)
}

// 가정통신문 파일 삭제
const deleteNotice = async (noticeId: any, fileId: any) => {
  return authApi
    .delete(`${baseUrl}/${noticeId}/file/${fileId}`)
    .then((res) => res)
    .catch((err) => err)
}

export {
  groupNoticeCreate,
  noticeList,
  noticeDetail,
  groupNoticeList,
  groupNoticeUpdate,
  noticeFileCreate,
  noticeFileDownload,
  deleteNotice,
}
