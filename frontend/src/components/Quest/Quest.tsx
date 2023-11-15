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
} from '@/stores/features/questSlice'
import '@/styles/quest/questStyle.scss'
import { Button } from '..'

interface QuestProps {
  questStatus: string
  deleteState: boolean
}

// eslint-disable-next-line react/prop-types
const Quest: React.FC<QuestProps> = ({ questStatus, deleteState }) => {
  const [open, setOpen] = useState<null | number>(null)
  const dispatch = useDispatch()
  const questList = useSelector((state: any) => state.quest.questsList)

  const openModal = (id: number) => {
    setOpen(id)
  }

  const closeModal = (id: number, isChecked: boolean, isConfirmed: boolean) => {
    setOpen(null)
    if (!isChecked) {
      dispatch(checkQuest(id))
    }
    if (isConfirmed) {
      dispatch(confirmQuest(id))
    }
  }

  const filteredQuests = questList.filter((quest: any) => {
    switch (questStatus) {
      case 'all':
        return true
      case 'ing':
        return quest.isChecked && !quest.isFinished
      case 'past':
        return quest.isChecked && quest.isFinished
      case 'new':
        return !quest.isChecked && !quest.isFinished
      default:
        return false
    }
  })
  const getQuestImage = (quest: any) => {
    if (!quest.isChecked) {
      return questImgNew
    }
    if (!quest.isFinished) {
      return questImgDefault
    }
    return questImgBlack
  }
  const deleteBTN = (id: any) => {
    dispatch(deleteQuest(id))
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
            onClose={() => setOpen(null)}
            aria-labelledby={`quest-title-${quest.questId}`}
            aria-describedby={`quest-description-${quest.questId}`}
          >
            <div className="quest-modal-close-btn">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeModal(quest.questId, quest.isChecked, true)
                }}
              >
                <img src="/public/btn/closeBtn.png" alt="" />
              </button>
            </div>
            <DialogTitle id={`quest-title-${quest.questId}`}>
              {quest.questTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id={`quest-description-${quest.questId}`}>
                {quest.questContent}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {questStatus === 'past' && deleteState && (
                <Button
                  className="red normal"
                  onClick={() => deleteBTN(quest.questId)}
                  label="삭제"
                />
              )}
              {!quest.isConfirmed ? (
                <div className="quest-button-container">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeModal(quest.questId, quest.isChecked, true)
                    }}
                    className="normal primary"
                    label="수락"
                  />
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeModal(quest.questId, quest.isChecked, false)
                    }}
                    className="normal red"
                    label="거절"
                  />
                </div>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeModal(quest.questId, quest.isChecked, true)
                  }}
                  className="normal primary"
                  label="확인"
                />
              )}
            </DialogActions>
          </Dialog>
          <img
            src={getQuestImage(quest)}
            alt="퀘스트이미지"
            className="quest-img"
          />
          <p className="quest-item-title">{quest.questTitle}</p>
          <p className="quest-item-created">{quest.createdAt}</p>
        </button>
      ))}
    </div>
  )
}

export default Quest
