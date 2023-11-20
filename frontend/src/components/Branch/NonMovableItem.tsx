import { useState } from 'react'
import '@/styles/branch.scss'
import { Comments } from '@/components'
import changeBTN from '../../../public/btn/writeIcon.svg'

const NonMovableItem = ({
  id,
  budName,
  idType,
  commentCount,
  branchColor,
}: any) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className="dnd_movable-item" style={{ backgroundColor: branchColor }}>
      {idType === 'bud' && (
        <div className="dnd_movable-item-content">
          <p className="dnd_movable-item-content-name">{budName}</p>
          <div className="dnd_movable-item-content-btn-container">
            <button
              onClick={handleOpen}
              className="dnd_movable-item-content-deleteBTN"
            >
              <img
                src={changeBTN}
                alt="수정버튼"
                className="dnd_movable-item-content-deleteBTN-img"
              />
            </button>
            {open && (
              <Comments
                open={open}
                handleClose={handleClose}
                budId={id}
                budName={budName}
                commentCount={commentCount}
              />
            )}
          </div>
        </div>
      )}
      {idType === 'seed' && (
        <div className="dnd_movable-item-content">
          <p className="dnd_movable-item-content-name">{budName}</p>
        </div>
      )}
    </div>
  )
}

export default NonMovableItem
