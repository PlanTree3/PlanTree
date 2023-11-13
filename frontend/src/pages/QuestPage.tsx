import { useState } from 'react'
import Quest from '@/components/Quest/Quest'

const QuestPage = () => {
  const [questStatus, setQuestStatus] = useState('all')
  const [deleteState, setDeleteState] = useState(false)
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
        <button onClick={() => changeQuest('all')} className="quest-btn">
          모든 퀘스트
        </button>
        <button onClick={() => changeQuest('ing')} className="quest-btn">
          진행 중
        </button>
        <button onClick={() => changeQuest('new')} className="quest-btn">
          새 퀘스트
        </button>
        <button onClick={() => changeQuest('past')} className="quest-btn">
          이전 퀘스트
        </button>
        {questStatus === 'past' && (
          <button
            onClick={deleteTrigger}
            className={deleteState ? 'quest-del-btn' : 'quest-btn'}
          >
            퀘스트 삭제
          </button>
        )}
      </div>
      <Quest questStatus={questStatus} deleteState={deleteState} />
      <div>
        <button>이전</button>
        <button>다음</button>
      </div>
    </>
  )
}

export default QuestPage
