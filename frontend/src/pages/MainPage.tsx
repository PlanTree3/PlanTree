import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { COLUMN_NAMES, DAY_NAMES } from '@/types/DnDType'
import { RootState } from '@/stores/store'

const MainPage = () => {
  const navigate = useNavigate()
  const buds = useSelector((state: RootState) => state.branch.buds)
  const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY } = COLUMN_NAMES
  const days = DAY_NAMES
  const today = new Date()
  const monthToday = today.getMonth() + 1
  const dayToday = today.getDay()
  const [selectDay, setSelectDay] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    // 일요일(0) 또는 토요일(6)인 경우
    if (dayToday === 0 || dayToday === 6) {
      setMessage('오늘의 일정은 없습니다')
    } else {
      const todayLabel = days[dayToday.toString()]
      setSelectDay(todayLabel);
      setMessage('')
    }
  }, [])
  const sendDays = (day: string) => {
    setSelectDay(day)
  }
  const returnItemsForColumn = (columnName: string) => {
    return (
      <div>
        <div>
          {buds
            .filter((bud) => bud.dayOfWeek === columnName)
            .map((bud) => {
              return <div key={bud.budId}>{bud.budName}</div>
            })}
        </div>
      </div>
    )
  }
  const handleBranchPage = () => {
    navigate('/budsTest')
  }

  return (
    <>
      <div>
        <div>42 번 째 나무</div>
        <div>
          {monthToday} / {dayToday}
        </div>
      </div>
      <div>
        <button onClick={() => sendDays(MONDAY)}>{MONDAY}</button>
        <button onClick={() => sendDays(TUESDAY)}>{TUESDAY}</button>
        <button onClick={() => sendDays(WEDNESDAY)}>{WEDNESDAY}</button>
        <button onClick={() => sendDays(THURSDAY)}>{THURSDAY}</button>
        <button onClick={() => sendDays(FRIDAY)}>{FRIDAY}</button>
      </div>
      {message ? (
        <div>{message}</div>
      ) : (
        <div>
          <div>To Do</div>
          <div title={selectDay}>{returnItemsForColumn(selectDay)}</div>
          <div title={selectDay} style={{ color: 'red' }}>
            {returnItemsForColumn(`${selectDay} 끝`)}
          </div>
        </div>
      )}
      <div>
        <button onClick={handleBranchPage}>상세 등록 페이지 이동</button>
      </div>
    </>
  )
}

export default MainPage
