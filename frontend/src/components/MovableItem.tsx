import { useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import {
  DragItem,
  ItemState,
  MovableItemProps,
  ITEM_TYPE,
  ColumnName,
  COLUMN_NAMES,
} from '@/types/DnDType'
import '@/styles/branch.scss'

const MovableItem = ({
  id,
  budName,
  index,
  moveCardHandler,
  setItems,
  dayOfWeek,
}: MovableItemProps) => {
  const changeItemColumn = (
    currentItem: { index: number; budName: string; budId: number },
    columnName: string,
  ) => {
    setItems((prevState: ItemState[]) =>
      prevState.map((e: ItemState) => {
        if (e.budId === currentItem.budId) {
          return {
            ...e,
            dayOfWeek: columnName,
          }
        }
        return e
      }),
    )
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
            ...item,
            budId: maxId + 1,
            dayOfWeek: point,
          }
          setItems((prevItems) => [...prevItems, newItem])
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
  const removeItem = (idx: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.budId !== idx))
  }
  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {budName}
      <button onClick={() => removeItem(id)} className="delete-btn">
        X
      </button>
    </div>
  )
}

export default MovableItem
