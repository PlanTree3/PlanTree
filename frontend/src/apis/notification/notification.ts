import { authApi } from '@/apis'

const baseUrl = 'api/notification-service/notification'

// 알람 유무 확인
const notificationCheck = async () => {
  return authApi
    .get(`${baseUrl}/check`)
    .then((res) => res)
    .catch((err) => err)
}

// 알림함 조회
const notificationBox = async () => {
  return authApi
    .get(`${baseUrl}`)
    .then((res) => res)
    .catch((err) => err)
}

// 알림 전체 삭제
const notificationDelete = async () => {
  return authApi
    .delete(`${baseUrl}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

// 알림 하나 읽음 처리
const notificationReading = async (notificationId: any) => {
  return authApi
    .patch(`${baseUrl}/${notificationId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export {
  notificationCheck,
  notificationBox,
  notificationDelete,
  notificationReading,
}
