import { useSelector } from 'react-redux'
import { MovableItem, MoveHandler } from '@/components'
import { RootState } from '@/stores/store.ts'
import '@/styles/branch.scss'

const ReturnItems = (columnName: string, selectedBranchId: number) => {
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
        .map((seed: any, index: number) => {
          return (
            <MovableItem
              branchId={seed.branchId}
              key={seed.seedId}
              id={seed.seedId}
              idType="seed"
              budName={seed.seedName}
              commentCount={seed.commentCount}
              index={index}
              dayOfWeek={seed.dayOfWeek}
              moveHandler={MoveHandler}
              branchColor={seed.branchColor}
            />
          )
        })}
      {buds
        ?.filter((bud: any) => bud.dayOfWeek === columnName)
        .map((bud: any, index: number) => {
          return (
            <MovableItem
              branchId={bud.branchId}
              key={bud.budId}
              id={bud.budId}
              idType="bud"
              budName={bud.budName}
              commentCount={bud.commentCount}
              index={index}
              dayOfWeek={bud.dayOfWeek}
              moveHandler={MoveHandler}
              branchColor={bud.branchColor}
              effect={bud.complete && 'light'}
            />
          )
        })}
    </>
  )
}

export default ReturnItems
