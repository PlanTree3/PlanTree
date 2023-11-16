import { RootState } from '@/stores/store.ts'

export const getTreeId = (state: RootState) => state.main.treeId
export const getBranchs = (state: RootState) => state.branch.branches
export const role = (state: RootState) => state.user.userData.role
