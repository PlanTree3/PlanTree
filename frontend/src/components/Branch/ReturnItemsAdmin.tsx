import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store.ts'
import '@/styles/branch.scss'
import NonMovableItem from './NonMovableItem.tsx'

const ReturnItemsAdmin = (columnName: string, selectedBranchId: number) => {
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const filteredSeeds = seeds?.filter(
    (seed: any) =>
      selectedBranchId === null || seed.branchId === selectedBranchId,
  )
  return (
    <>
      {filteredSeeds
        ?.filter((seed: any) => seed.dayOfWeek === columnName)
        .map((seed: any) => {
          return (
            <NonMovableItem
              key={seed.seedId}
              id={seed.seedId}
              idType="seed"
              budName={seed.seedName}
              commentCount={seed.commentCount}
              branchColor={seed.branchColor}
            />
          )
        })}
      {buds
        ?.filter((bud: any) => bud.dayOfWeek === columnName)
        .map((bud: any) => {
          return (
            <NonMovableItem
              key={bud.budId}
              id={bud.budId}
              idType="bud"
              budName={bud.budName}
              commentCount={bud.commentCount}
              branchColor={bud.branchColor}
            />
          )
        })}
    </>
  )
}

export default ReturnItemsAdmin
