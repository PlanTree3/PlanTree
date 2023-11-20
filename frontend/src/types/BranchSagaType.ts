export interface BranchType {
  branchId: number
  branchName: string
  branchColor: string
  seeds: {
    seedId: number
    seedName: string
  }
}

export interface BudsType {
  branchId: string
  branchColor: string
  budId: number
  budName: string
  commentCount: number
  dayOfWeek: number | string
  complete: boolean
}

export interface SeedsType {
  seedId: number
  seedName: string
  branchId: string
  branchColor: string
  dayOfWeek: string
}
