const baseUrl = 'api/forest-service/forest'

// treeId로 끝나는 api url을 문자열 형태로 반환하는 함수
const treeApiUrl = (forestId: number, treeId: number) =>
  `${baseUrl}/${forestId}/tree/${treeId}`

const branchApiUrl = (forestId: number, treeId: number, branchId: number) =>
  `${baseUrl}/${forestId}/tree/${treeId}/branch/${branchId}`

const seedApiUrl = (
  forestId: number,
  treeId: number,
  branchId: number,
  seedId: number,
) => `${baseUrl}/${forestId}/tree/${treeId}/branch/${branchId}/seed/${seedId}`

const budApiUrl = (
  forestId: number,
  treeId: number,
  branchId: number,
  budId: number,
) => `${baseUrl}/${forestId}/tree/${treeId}/branch/${branchId}/bud/${budId}`

export { treeApiUrl, branchApiUrl, seedApiUrl, budApiUrl }
