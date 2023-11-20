import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import questImgNew from '../../../public/test/questIcon_new.png'
import questImgDefault from '../../../public/test/questIcon_defalut.png'
import questImgBlack from '../../../public/test/questIcon_black.png'
import {
  checkQuest,
  confirmQuest,
  deleteQuest,
  successRequestQuest,
} from '@/stores/features/questSlice'
import '@/styles/quest/questStyle.scss'
import { Button } from '..'

interface QuestProps {
  questStatus: string
  // deleteState: boolean
}

// eslint-disable-next-line react/prop-types
const Quest: React.FC<QuestProps> = ({ questStatus }) => {
  const [open, setOpen] = useState<null | string>(null)
  const dispatch = useDispatch()
  const questList = useSelector((state: any) => state.quest.questsList)

  const openModal = (id: string) => {
    setOpen(id)
  }
  const closeModal = (id: string, isChecked: boolean, isConfirmed: boolean) => {
    console.log('야 이거 실행되고는 있지???')
    setOpen(null)
    if (!isChecked) {
      dispatch(checkQuest(id))
      // console.log('퀘스트 확인함', id)
    }
    if (isConfirmed) {
      console.log('로직 뭐임???')
      dispatch(confirmQuest(id))
    }
  }

  const handleClose = (
    _event: React.SyntheticEvent<NonNullable<unknown>, Event>,
    reason: string,
  ) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      const questId = open
      const questData = questList.find(
        (quest: any) => quest.questId === questId,
      )
      if (questData && questId) {
        closeModal(questId, questData.checked, false)
      }
    }
  }

  const filteredQuests = questList.filter((quest: any) => {
    switch (questStatus) {
      case 'all':
        return true
      case 'ing':
        return quest.confirmed && !quest.finished
      case 'past':
        return quest.finished
      case 'new':
        return !quest.confirmed
      default:
        return false
    }
  })
  const getQuestImage = (quest: any) => {
    if (!quest.checked) {
      return questImgNew
    }
    if (!quest.finished) {
      return questImgDefault
    }
    return questImgBlack
  }
  const deleteBTN = (id: any) => {
    dispatch(deleteQuest(id))
  }
  const renderButtons = (quest: any) => {
    if (quest.finished) {
      return (
        <Button
          className="red normal"
          onClick={() => deleteBTN(quest.questId)}
          label="삭제"
        />
      )
    }
    if (quest.confirmed) {
      if (!quest.waiting) {
        return (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                closeModal(quest.questId, quest.checked, false)
              }}
              className="normal primary"
              label="확인"
            />
            <Button
              onClick={(e) => {
                e.stopPropagation()
                closeModal(quest.questId, quest.checked, true)
                dispatch(successRequestQuest(quest.questId))
              }}
              className="normal primary"
              label="완료 요청"
            />
          </>
        )
      }
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            closeModal(quest.questId, quest.checked, false)
          }}
          className="normal primary"
          label="확인"
        />
      )
    }
    return (
      <div className="quest-button-container">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            closeModal(quest.questId, quest.checked, true)
          }}
          className="normal primary"
          label="수락"
        />
        <Button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(deleteQuest(quest.questId))
          }}
          className="normal red"
          label="거절"
        />
      </div>
    )
  }

  return (
    <div className="quest-container">
      {filteredQuests.map((quest: any) => (
        <button
          className="quest-container-inner"
          key={quest.questId}
          tabIndex={0}
          onClick={() => openModal(quest.questId)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              openModal(quest.questId)
            }
          }}
        >
          <Dialog
            open={open === quest.questId}
            onClose={handleClose}
            aria-labelledby={`quest-title-${quest.questId}`}
            aria-describedby={`quest-description-${quest.questId}`}
          >
            <div className="quest-modal-close-btn">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeModal(quest.questId, quest.checked, false)
                }}
              >
                <img src="/btn/closeBtn.png" alt="닫기" />
              </button>
            </div>
            <DialogTitle id={`quest-title-${quest.questId}`}>
              {quest.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id={`quest-description-${quest.questId}`}>
                {/*{quest.issuerName} ({quest.issuerType}) 님이{' '}*/}
                {/*{quest.acceptorName} 에게*/}
              </DialogContentText>
              <DialogContentText id={`quest-description-${quest.questId}`}>
                {quest.content}
              </DialogContentText>
            </DialogContent>
            <DialogActions>{renderButtons(quest)}</DialogActions>
          </Dialog>
          <img
            src={getQuestImage(quest)}
            alt="퀘스트이미지"
            className="quest-img"
          />
          <p className="quest-item-title">{quest.title}</p>
          <p className="quest-item-created">{quest.createdAt.slice(0, 10)}</p>
        </button>
      ))}
    </div>
  )
}

export default Quest
