import { useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { addBuds } from '@/stores/features/branchSlice'
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

const MovableItem = ({
  id,
  budName,
  index,
  moveCardHandler,
  dayOfWeek,
}: MovableItemProps) => {
  const dispatch = useDispatch()
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
      moveCardHandler(dragIndex, hoverIndex)
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
  // const removeItem = (itemId: number) => {
  //   const updatedItems = buds.filter((item) => item.budId !== itemId)
  //   dispatch(addBuds(updatedItems))
  // }
  return (
    <div ref={ref} className="dnd_movable-item" style={{ opacity }}>
      {budName}
      {/*<button onClick={() => removeItem(id)} className="dnd_delete-btn">*/}
      {/*  X*/}
      {/*</button>*/}
    </div>
  )
}

export default MovableItem
