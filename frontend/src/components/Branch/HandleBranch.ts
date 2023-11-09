import { useDispatch, useSelector } from 'react-redux'
import { addBuds, addSeeds } from '@/stores/features/branchSlice.ts'
import { RootState } from '@/stores/store.ts'

export const MoveHandler = (dragIndex: number, hoverIndex: number) => {
  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const dragSeed = seeds[dragIndex]
  const dragBud = buds[dragIndex]
  if (dragSeed) {
    const updatedSeeds = [...seeds]
    const draggedItem = updatedSeeds.splice(dragIndex, 1)[0]
    updatedSeeds.splice(hoverIndex, 0, draggedItem)
    dispatch(addSeeds(updatedSeeds))
  }
  if (dragBud) {
    const updatedBuds = [...buds]
    const draggedItem = updatedBuds.splice(dragIndex, 1)[0]
    updatedBuds.splice(hoverIndex, 0, draggedItem)
    dispatch(addBuds(updatedBuds))
  }
}
