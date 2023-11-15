// import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DAY_NAMES } from '@/types/DnDType'
import { RootState } from '@/stores/store'
import { getBranchData } from '@/stores/features/branchSlice.ts'
import '@/styles/main/mainStyle.scss'
import { getMainData } from '@/stores/features/mainSlice.ts'
import { LoginCheck, StudentCheck, Tree } from '@/components'
import Button from '@/components/Button/Button'

const MainPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const treeId = useSelector((state: RootState) => state.main.treeId)
  const treeName = useSelector((state: RootState) => state.main.treeName)
  const buds = useSelector((state: RootState) => state.branch.buds)
  // const { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY } = COLUMN_NAMES
  const days = DAY_NAMES
  const today = new Date()
  const monthToday = today.getMonth() + 1
  const dayToday = today.getDay()
  const dateToday = today.getDate()
  const [selectDay, setSelectDay] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getMainData())
    if (treeId) {
      dispatch(getBranchData())
    }
    // 일요일(0) 또는 토요일(6)인 경우
    if (dayToday === 0 || dayToday === 6) {
      setMessage('오늘의 일정은 없습니다')
    } else {
      const todayLabel = days[dayToday.toString()]
      setSelectDay(todayLabel)
      setMessage('')
    }
  }, [])
  const sendDays = (day: string) => {
    setSelectDay(day)
  }
  const returnItemsForColumn = (columnName: string) => {
    return (
      <div>
        {buds
          ?.filter((bud: any) => bud.dayOfWeek === columnName)
          .map((bud: any) => {
            return (
              <li className="main-bud-list" key={bud.budId}>
                <button
                // onClick={() => detailBud(bud.budId, bud.budName)}
                >
                  {bud.budName}
                </button>
              </li>
            )
          })}
      </div>
    )
  }
  const returnFinishedItemsForColumn = (columnName: string) => {
    return (
      <div>
        {buds
          ?.filter((bud: any) => bud.dayOfWeek === columnName)
          .map((bud: any) => {
            return <button key={bud.budId}>{bud.budName}</button>
          })}
      </div>
    )
  }
  const handleBranchPage = () => {
    navigate('/branch')
  }

  return (
    <>
      <div>
        <div className="main-tree-check">{treeName}</div>
        <div className="main-date">
          {monthToday} / {dateToday}
        </div>
      </div>
      <div className="main-box-container">
        <div className="main-page-container">
          <button
            id="monday"
            onClick={() => sendDays('MON')}
            className={`main-day-btn ${
              selectDay === 'MON' &&
              ' border-lime-500 shadow-[0_0_7px_3px_#84cc16]'
            }`}
          >
            월
          </button>
          <div className="main-page-btn-top">
            <button
              id="tuesday"
              onClick={() => sendDays('TUE')}
              className={`main-day-btn ${
                selectDay === 'TUE' &&
                ' border-lime-500 shadow-[0_0_7px_3px_#84cc16]'
              }`}
            >
              화
            </button>
            <button
              id="wednesday"
              onClick={() => sendDays('WEN')}
              className={`main-day-btn ${
                selectDay === 'WEN' &&
                ' border-lime-500 shadow-[0_0_7px_3px_#84cc16]'
              }`}
            >
              수
            </button>
            <button
              id="thursday"
              onClick={() => sendDays('THU')}
              className={`main-day-btn ${
                selectDay === 'THU' &&
                ' border-lime-500 shadow-[0_0_7px_3px_#84cc16]'
              }`}
            >
              목
            </button>
          </div>
          <button
            id="friday"
            onClick={() => sendDays('FRI')}
            className={`main-day-btn ${
              selectDay === 'FRI' &&
              ' border-lime-500 shadow-[0_0_7px_3px_#84cc16]'
            }`}
          >
            금
          </button>
          <div className="main-tree-container">
            <Tree degree={80} />
          </div>
          <div className="main-tree-degree">진행률 : </div>
        </div>
        <div className="main-todo-container">
          {dayToday === 0 ||
            (dayToday === 6 && (
              <Button className="long primary" label="회고하러 가기" />
            ))}
          <div className="main-todo-list">
            <div className="main-todo-list-title">To Do</div>
            <div className="main-todo-list-content">
              {message ? (
                <div>{message}</div>
              ) : (
                <div>
                  <div title={selectDay}>{returnItemsForColumn(selectDay)}</div>
                  <div title={selectDay} style={{ color: 'red' }}>
                    {returnFinishedItemsForColumn(`${selectDay}_FINISH`)}
                  </div>
                </div>
              )}
            </div>
            <Button
              className="lime small"
              label="일정 등록하기"
              onClick={handleBranchPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentCheck(LoginCheck(MainPage))
