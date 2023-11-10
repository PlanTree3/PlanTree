const baseUrl = 'api/forest-service'

// treeId로 끝나는 api url을 문자열 형태로 반환하는 함수
const treeApiUrl = (treeId: string) =>
  `${baseUrl}/tree/${treeId}`

const scheduleUrl = (treeId: string) =>
  `${baseUrl}/commons/tree/${treeId}`

const branchApiUrl = (treeId: number, branchId: number) =>
  `${baseUrl}/tree/${treeId}/branch/${branchId}`

const seedApiUrl = (
  treeId: number,
  branchId: number,
  seedId: number,
) => `${baseUrl}/tree/${treeId}/branch/${branchId}/seed/${seedId}`

const budApiUrl = (
  treeId: number,
  branchId: number,
  budId: number,
) => `${baseUrl}/tree/${treeId}/branch/${branchId}/bud/${budId}`

export { treeApiUrl, branchApiUrl, seedApiUrl, budApiUrl, scheduleUrl }
