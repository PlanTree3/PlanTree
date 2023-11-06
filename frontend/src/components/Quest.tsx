import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import questImgNew from '@/asset/test/questIcon_new.png'
import questImgDefault from '@/asset/test/questIcon_defalut.png'
import questImgBlack from '@/asset/test/questIcon_black.png'
import {
  checkQuest,
  confirmQuest,
  deleteQuest,
} from '@/stores/features/questSlice'

interface QuestProps {
  questStatus: string
  deleteState: boolean
}

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
    <>
      <div>
        {filteredQuests.map((quest: any) => (
          <div
            key={quest.questId}
            role="button" // 니 역할은 이제 버튼이여
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
                  <button onClick={() => deleteBTN(quest.questId)}>삭제</button>
                )}
                {!quest.isConfirmed ? (
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        closeModal(quest.questId, quest.isChecked, true)
                      }}
                    >
                      수락
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        closeModal(quest.questId, quest.isChecked, false)
                      }}
                    >
                      거절
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeModal(quest.questId, quest.isChecked, true)
                    }}
                  >
                    확인
                  </button>
                )}
              </DialogActions>
            </Dialog>
            <img
              src={getQuestImage(quest)}
              alt="퀘스트이미지"
              style={{ width: '5vw' }}
            />
            <p>{quest.questTitle}</p>
            <p>{quest.createdAt}</p>
          </div>
        ))}
      </div>
      <div>
        <button>이전</button>
        <button>다음</button>
      </div>
    </>
  )
}

export default Quest
