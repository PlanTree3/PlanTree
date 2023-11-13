import { useRef, useState } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  addBuds,
  finishedBuds,
  finishRejectBuds,
  moveBuds,
  removeBuds,
  removeSeeds,
} from '@/stores/features/branchSlice'
import {
  DragItem,
  MovableItemProps,
  ITEM_TYPE,
  ColumnName,
  COLUMN_NAMES,
} from '@/types/DnDType'
import '@/styles/branch.scss'
import { RootState } from '@/stores/store'
import { Comments } from '@/components'
import delBTN from '../../../public/btn/deleteIcon.svg'
import changeBTN from '../../../public/btn/writeIcon.svg'

const MovableItem = ({
  branchId,
  id,
  budName,
  idType,
  commentCount,
  index,
  moveHandler,
  dayOfWeek,
  branchColor,
}: MovableItemProps) => {
  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const [detailOpen, setDeailOpen] = useState(false)
  const changeItemColumn = (
    currentItem: any,
    columnName: string,
    isFinishDay: boolean,
    alreadyFinished: boolean,
  ) => {
    const newBuds = buds.map((e: any) => {
      if (e.budId === currentItem.budId) {
        return { ...e, dayOfWeek: columnName }
      }
      return e
    })
    const createdItem = {
      branchId: currentItem.branchId,
      budId: currentItem.budId,
      dayOfWeek: columnName,
    }
    const data = {
      newBuds,
      createdItem,
    }
    if (alreadyFinished && isFinishDay) {
      Swal.fire({
        title: '이미 끝난 일정입니다.',
        text: '일정을 수정하시려면 진행 중 단계로 먼저 옮기셔야 합니다.',
        icon: 'warning',
        iconColor: 'yellow',
      })
    } else if (alreadyFinished) {
      Swal.fire({
        title: '끝난 일정입니다.',
        text: '정말로 다시 시작하시겠습니까?',
        icon: 'warning',
        iconColor: 'yellow',
        showCancelButton: true,
        cancelButtonText: '취소',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(finishRejectBuds(data))
        }
      })
    } else if (isFinishDay) {
      dispatch(finishedBuds(data))
    } else {
      dispatch(moveBuds(data))
    }
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
    item: { index, budName, dayOfWeek, id, branchId },
    end: (item, monitor) => {
      const dropResult: DropPoint | null = monitor.getDropResult()
      if (dropResult) {
        const point = dropResult.name as ColumnName
        const maxId = Math.floor(Math.random() * 1000 + 2000)
        const isFinishDay =
          Object.values(COLUMN_NAMES).includes(point) &&
          point.includes('_FINISH')
        const alreadyFinished =
          Object.values(COLUMN_NAMES).includes(dayOfWeek) &&
          dayOfWeek.includes('_FINISH')
        console.log(isFinishDay)
        const valuesArray = Object.values(COLUMN_NAMES)
        const pointIndex = valuesArray.indexOf(point)
        const dayOfWeekIndex = valuesArray.indexOf(dayOfWeek)
        if (pointIndex === dayOfWeekIndex) {
          /* TODO document why this block is empty */
        } else if (pointIndex < dayOfWeekIndex && alreadyFinished) {
          console.log(pointIndex)
          Swal.fire({
            title: '등록된 요일 이전으로 수정은 안돼요!',
            text: '일정을 잘못 등록하셨다면, 삭제하고 다시 등록해주세요!',
            icon: 'warning',
            iconColor: 'red',
          })
        } else if (dayOfWeek === COLUMN_NAMES.DEFAULT) {
          if (isFinishDay) {
            alert('생성된 씨앗을 바로 끝낼 수는 없어요!')
          } else {
            const newItem: any = {
              budId: maxId + 1,
              branchColor,
              budName,
              dayOfWeek: point,
              branchId,
            }
            const { budId, branchColor: newColor, ...createdItem } = newItem
            const newBuds = [...buds, newItem]
            const data = {
              newBuds,
              createdItem,
            }
            dispatch(addBuds(data))
          }
        } else {
          const newItem = {
            ...item,
            budId: id,
            dayOfWeek: point,
          }
          changeItemColumn(newItem, point, isFinishDay, alreadyFinished)
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))
  const removeSeed = (itemId: string) => {
    const updatedItems = seeds.filter((item: any) => item.seedId !== itemId)
    const data = {
      newSeeds: updatedItems,
      createdItem: itemId,
    }
    dispatch(removeSeeds(data))
  }
  const removeBud = (itemId: string) => {
    const updatedItems = buds.filter((item: any) => item.budId !== itemId)
    const data = {
      newBuds: updatedItems,
      createdItem: itemId,
    }
    dispatch(removeBuds(data))
  }
  const handleDetailBuds = () => {
    setDeailOpen(true)
  }
  const closeDetailBuds = () => {
    setDeailOpen(false)
    console.log('????')
  }
  return (
    <div
      ref={ref}
      className="dnd_movable-item"
      style={{ opacity, backgroundColor: branchColor }}
    >
      {idType === 'bud' && (
        <>
          <button
            className="dnd_movable-item-content"
            onClick={() => handleDetailBuds()}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDetailBuds()
              }
            }}
          >
            <p className="dnd_movable-item-content-name">{budName}</p>
            <button
              // onClick={() => removeBud(id)}
              className="dnd_movable-item-content-deleteBTN"
            >
              <img
                src={changeBTN}
                alt="수정버튼"
                className="dnd_movable-item-content-deleteBTN-img"
              />
            </button>
            <button
              onClick={() => removeBud(id)}
              className="dnd_movable-item-content-deleteBTN"
            >
              <img
                src={delBTN}
                alt="삭제버튼"
                className="dnd_movable-item-content-deleteBTN-img"
              />
            </button>
          </button>
          {/*<Comments*/}
          {/*  open={detailOpen}*/}
          {/*  handleClose={closeDetailBuds}*/}
          {/*  budId={id}*/}
          {/*  budName={budName}*/}
          {/*  commentCount={commentCount}*/}
          {/*/>*/}
        </>
      )}
      {idType === 'seed' && (
        <button className="dnd_movable-item-content">
          <p className="dnd_movable-item-content-name">{budName}</p>
          <button
            // onClick={() => removeSeed(id)}
            className="dnd_movable-item-content-deleteBTN"
          >
            <img
              src={changeBTN}
              alt="수정버튼"
              className="dnd_movable-item-content-deleteBTN-img"
            />
          </button>
          <button
            onClick={() => removeSeed(id)}
            className="dnd_movable-item-content-deleteBTN"
          >
            <img
              src={delBTN}
              alt="삭제버튼"
              className="dnd_movable-item-content-deleteBTN-img"
            />
          </button>
        </button>
      )}
    </div>
  )
}

export default MovableItem
