import { useSelector } from 'react-redux'
import { MovableItem, MoveHandler } from '@/components'
import { RootState } from '@/stores/store.ts'
import '@/styles/branch.scss'

const ReturnItems = (columnName: string, selectedBranchId: number) => {
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const filteredSeeds = seeds.filter(
    (seed: any) =>
      selectedBranchId === null || seed.branchId === selectedBranchId,
  )
  return (
    <div className="dnd-seed-inner-container">
      {filteredSeeds
        .filter((seed: any) => seed.dayOfWeek === columnName)
        .map((seed: any, index: number) => {
          return (
            <MovableItem
              key={seed.seedId}
              id={seed.seedId}
              idType="seed"
              budName={seed.seedName}
              comments={seed.comments}
              index={index}
              dayOfWeek={seed.dayOfWeek}
              moveHandler={MoveHandler}
              color={seed.color}
            />
          )
        })}
      {buds
        .filter((bud: any) => bud.dayOfWeek === columnName)
        .map((bud: any, index: number) => {
          return (
            <MovableItem
              key={bud.budId}
              id={bud.budId}
              idType="bud"
              budName={bud.budName}
              comments={bud.comments}
              index={index}
              dayOfWeek={bud.dayOfWeek}
              moveHandler={MoveHandler}
              color={bud.color}
            />
          )
        })}
    </div>
  )
}

export default ReturnItems
