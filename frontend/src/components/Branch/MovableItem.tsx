import { useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { addBuds, addSeeds } from '@/stores/features/branchSlice'
import {
  DragItem,
  ItemState,
  MovableItemProps,
  ITEM_TYPE,
  ColumnName,
  COLUMN_NAMES,
} from '@/types/DnDType'
import '@/styles/branch.scss'
import { RootState } from '@/stores/store'
import { handleComment } from '@/components'

const MovableItem = ({
  id,
  budName,
  idType,
  comments,
  index,
  moveHandler,
  dayOfWeek,
  color,
}: MovableItemProps) => {
  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const changeItemColumn = (
    currentItem: { index: number; budName: string; budId: number },
    columnName: string,
  ) => {
    const updatedItems = buds.map((e: ItemState) => {
      if (e.budId === currentItem.budId) {
        return { ...e, dayOfWeek: columnName }
      }
      return e
    })
    dispatch(addBuds(updatedItems))
  }
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop<DragItem>({
    accept: ITEM_TYPE,
    hover(
      item: { index: number; budName: string },
      monitor: DropTargetMonitor,
    ) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      moveHandler(dragIndex, hoverIndex)
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex
    },
  })

  type DropPoint = { dropEffect: string; name: string }
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index, budName, dayOfWeek, id },
    end: (item, monitor) => {
      const dropResult: DropPoint | null = monitor.getDropResult()
      if (dropResult) {
        const point = dropResult.name as ColumnName
        const maxId = Math.floor(Math.random() * 1000 + 2000)
        if (dayOfWeek === COLUMN_NAMES.DEFAULT) {
          const newItem = {
            budId: maxId + 1,
            budName,
            dayOfWeek: point,
            color,
          }
          const newBuds = [...buds, newItem]
          dispatch(addBuds(newBuds))
        } else {
          const newItem = {
            ...item,
            budId: id,
            dayOfWeek: point,
          }
          changeItemColumn(newItem, point)
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))
  const removeSeed = (itemId: number) => {
    const updatedItems = seeds.filter((item: any) => item.seedId !== itemId)
    dispatch(addSeeds(updatedItems))
  }
  const removeBud = (itemId: number) => {
    const updatedItems = buds.filter((item: any) => item.budId !== itemId)
    dispatch(addBuds(updatedItems))
  }
  return (
    <div
      ref={ref}
      className="dnd_movable-item"
      style={{ opacity, backgroundColor: color }}
    >
      {idType === 'bud' && (
        <div>
          {budName}
          <button
            onClick={() => handleComment(comments)}
            className="dnd_delete-btn"
          >
            +
          </button>
          <button onClick={() => removeBud(id)} className="dnd_delete-btn">
            X
          </button>
        </div>
      )}
      {idType === 'seed' && (
        <div>
          {budName}
          <button onClick={() => removeSeed(id)} className="dnd_delete-btn">
            X
          </button>
        </div>
      )}
    </div>
  )
}

export default MovableItem
