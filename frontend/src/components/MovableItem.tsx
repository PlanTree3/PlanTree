import { useRef } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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

const MovableItem = ({
  id,
  budName,
  idType,
  comments,
  index,
  moveCardHandler,
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
    const updatedItems = seeds.filter((item) => item.seedId !== itemId)
    dispatch(addSeeds(updatedItems))
  }
  const removeBud = (itemId: number) => {
    const updatedItems = buds.filter((item) => item.budId !== itemId)
    dispatch(addBuds(updatedItems))
  }
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const handleCommentClick = (commentId: number) => {
    navigate(`/comments/${commentId}`)
    Swal.close()
  }
  const handleComment = () => {
    const content = (
      <div>
        {comments?.map((comment) => (
          <div key={comment.commentId}>
            <br />
            <button onClick={() => handleCommentClick(comment.commentId)}>
              {comment.title} : {comment.userName}
            </button>
            <br />
          </div>
        ))}
      </div>
    )

    MySwal.fire({
      title: 'Comments',
      html: content,
      width: 600,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
      confirmButtonText: 'Close',
    })
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
          <button onClick={() => handleComment()} className="dnd_delete-btn">
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
