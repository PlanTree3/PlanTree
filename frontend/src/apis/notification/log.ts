import { authApi } from '@/apis'

const baseUrl = 'api/notification-service/notification'

// 나무 로그 조회 (나무 상세 페이지)
const treeLog = async (treeId: any) => {
  return authApi
    .get(`${baseUrl}/tree/${treeId}`)
    .then((res) => res)
    .catch((err) => err)
}

export { treeLog }
