const baseUrl = 'api/forest-service'

// treeId로 끝나는 api url을 문자열 형태로 반환하는 함수
const treeApiUrl = (treeId: string) => `${baseUrl}/tree/${treeId}`

const scheduleUrl = (treeId: string) => `${baseUrl}/commons/tree/${treeId}`

const branchApiUrl = (treeId: string, branchId: string) =>
  `${baseUrl}/tree/${treeId}/branch/${branchId}`

const seedApiUrl = (treeId: string, branchId: string, seedId: string) =>
  `${baseUrl}/tree/${treeId}/branch/${branchId}/seed/${seedId}`

const budApiUrl = (treeId: string, branchId: string, budId: string) =>
  `${baseUrl}/tree/${treeId}/branch/${branchId}/bud/${budId}`

const commentApiUrl = (treeId: string, budId: string) =>
  `${baseUrl}/tree/${treeId}/bud/${budId}`

export {
  treeApiUrl,
  branchApiUrl,
  seedApiUrl,
  budApiUrl,
  scheduleUrl,
  commentApiUrl,
}
