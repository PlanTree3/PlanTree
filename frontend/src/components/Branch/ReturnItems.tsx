import { useSelector } from 'react-redux'
import { MovableItem, MoveHandler } from '@/components'
import { RootState } from '@/stores/store.ts'

const ReturnItems = (columnName: string, selectedBranchId: number) => {
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const filteredSeeds = seeds.filter(
    (seed: any) =>
      selectedBranchId === null || seed.branchId === selectedBranchId,
  )
  return (
    <div>
      <div>
        {filteredSeeds
          .filter((seed: any) => seed.dayOfWeek === columnName)
          .map((seed: any, index: number) => {
            return (
              <div key={seed.seedId}>
                <MovableItem
                  id={seed.seedId}
                  idType="seed"
                  budName={seed.seedName}
                  comments={seed.comments}
                  index={index}
                  dayOfWeek={seed.dayOfWeek}
                  moveHandler={MoveHandler}
                  color={seed.color}
                />
              </div>
            )
          })}
      </div>
      <div>
        {buds
          .filter((bud: any) => bud.dayOfWeek === columnName)
          .map((bud: any, index: number) => {
            return (
              <div key={bud.budId}>
                <MovableItem
                  id={bud.budId}
                  idType="bud"
                  budName={bud.budName}
                  comments={bud.comments}
                  index={index}
                  dayOfWeek={bud.dayOfWeek}
                  moveHandler={MoveHandler}
                  color={bud.color}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ReturnItems
