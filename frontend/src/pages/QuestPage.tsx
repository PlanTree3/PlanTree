import { useEffect, useState } from 'react'
import Quest from '@/components/Quest/Quest'
import LoginCheck from '@/components/LoginCheck.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/stores/store.ts'
import { getQuestData } from '@/stores/features/questSlice.ts'

const QuestPage = () => {
  const [questStatus, setQuestStatus] = useState('all')
  const [deleteState, setDeleteState] = useState(false)
  const role = useSelector((state: RootState) => state.user.userData.role)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuestData())
  }, [role])
  const changeQuest = (id: string) => {
    setQuestStatus(id)
    setDeleteState(false)
  }
  const deleteTrigger = () => {
    setDeleteState(!deleteState)
  }
  return (
    <>
      <div className="quest-btn-container">
        <button
          onClick={() => changeQuest('all')}
          className={`quest-btn${questStatus === 'all' ? '-selected' : ''}`}
        >
          모든 퀘스트
        </button>
        <button
          onClick={() => changeQuest('ing')}
          className={`quest-btn${questStatus === 'ing' ? '-selected' : ''}`}
        >
          진행 중
        </button>
        <button
          onClick={() => changeQuest('new')}
          className={`quest-btn${questStatus === 'new' ? '-selected' : ''}`}
        >
          새 퀘스트
        </button>
        <button
          onClick={() => changeQuest('past')}
          className={`quest-btn${questStatus === 'past' ? '-selected' : ''}`}
        >
          이전 퀘스트
        </button>
        {questStatus === 'past' && (
          <button
            onClick={deleteTrigger}
            className={deleteState ? 'quest-del-btn-selected' : 'quest-del-btn'}
          >
            퀘스트 삭제
          </button>
        )}
      </div>
      <Quest questStatus={questStatus} deleteState={deleteState} />
    </>
  )
}

export default LoginCheck(QuestPage)
