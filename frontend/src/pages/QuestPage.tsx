import { useState } from 'react'
import Quest from '@/components/Quest'

const QuestPage = () => {
  const [questStatus, setQuestStatus] = useState('0')
  const [deleteState, setDeleteState] = useState(false)
  const changeQuest = (id: string) => {
    setQuestStatus(id)
  }
  const deleteTrigger = () => {
    setDeleteState(!deleteState)
  }
  return (
    <>
      <div>
        <button onClick={() => changeQuest('all')}>전체 퀘스트 보기</button>
        <button onClick={() => changeQuest('ing')}>진행 중인 퀘스트</button>
        <button onClick={() => changeQuest('new')}>새 퀘스트 보기</button>
        <button onClick={() => changeQuest('past')}>지난 퀘스트</button>
        {questStatus === 'past' && (
          <button onClick={deleteTrigger}>퀘스트 삭제</button>
        )}
      </div>
      <Quest questStatus={questStatus} deleteState={deleteState} />
    </>
  )
}

export default QuestPage
