import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import peroro from '../../public/test/4.webp'
import { COLUMN_NAMES, DAY_NAMES } from '@/types/DnDType'
import { RootState } from '@/stores/store'
import { addBuds } from '@/stores/features/branchSlice.ts'
import '@/styles/main/mainStyle.scss'
import { getMainData } from '@/stores/features/mainSlice.ts'
import { Tree } from '@/components'
import Button from '@/components/Button/Button'

const MainPage = () => {
  const dispatch = useDispatch()
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
    dispatch(getMainData())
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
    const changeBud = (id: number, text: string) => {
      const updatedBuds = buds.map((bud) => {
        if (bud.budId === id) {
          return { ...bud, budName: text }
        }
        return bud
      })
      dispatch(addBuds(updatedBuds))
    }
    const detailBud = (id: number, name: string) => {
      Swal.fire({
        input: 'text',
        inputValue: name,
        width: 600,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
        confirmButtonText: 'Update',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          changeBud(id, result.value)
        }
      })
    }
    return (
      <>
        {buds
          .filter((bud) => bud.dayOfWeek === columnName)
          .map((bud) => {
            return (
              <li className="main-bud-list">
                <button
                  onClick={() => detailBud(bud.budId, bud.budName)}
                  key={bud.budId}
                >
                  {bud.budName}
                </button>
              </li>
            )
          })}
      </>
    )
  }
  const returnFinishedItemsForColumn = (columnName: string) => {
    return (
      <div>
        <div>
          {buds
            .filter((bud) => bud.dayOfWeek === columnName)
            .map((bud) => {
              return <button key={bud.budId}>{bud.budName}</button>
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
        <div className="main-tree-check">42 번 째 나무</div>
        <div className="main-date">
          {monthToday} / {dayToday}
        </div>
      </div>
      <div className="main-box-container">
        <div className="main-page-container">
          <button
            id="monday"
            onClick={() => sendDays(MONDAY)}
            className="main-day-btn "
          >
            월
          </button>
          <div className="main-page-btn-top">
            <button
              id="tuesday"
              onClick={() => sendDays(TUESDAY)}
              className="main-day-btn"
            >
              화
            </button>
            <button
              id="wednesday"
              onClick={() => sendDays(WEDNESDAY)}
              className="main-day-btn"
            >
              수
            </button>
            <button
              id="thursday"
              onClick={() => sendDays(THURSDAY)}
              className="main-day-btn"
            >
              목
            </button>
          </div>
          <button
            id="friday"
            onClick={() => sendDays(FRIDAY)}
            className="main-day-btn"
          >
            금
          </button>
          <div className="main-tree-container">
            <Tree degree={80} />
          </div>
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
                    {returnFinishedItemsForColumn(`${selectDay} 끝`)}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="primary small "
              label="일정 등록하기"
              onClick={handleBranchPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage

// return (
//   <>
//     <div>
//       <div className="main-tree-check">42 번 째 나무</div>
//       <div className="main-date">
//         {monthToday} / {dayToday}
//       </div>
//     </div>
//     <div className="main-box-container">
//       <div className="main-arch-container">
//         <button
//           id="monday"
//           onClick={() => sendDays(MONDAY)}
//           className="main-day-btn"
//         >
//           월
//         </button>
//         <button
//           id="tuesday"
//           onClick={() => sendDays(TUESDAY)}
//           className="main-day-btn"
//         >
//           화
//         </button>
//         <button
//           id="wednesday"
//           onClick={() => sendDays(WEDNESDAY)}
//           className="main-day-btn"
//         >
//           수
//         </button>
//         <button
//           id="thursday"
//           onClick={() => sendDays(THURSDAY)}
//           className="main-day-btn"
//         >
//           목
//         </button>
//         <button
//           id="friday"
//           onClick={() => sendDays(FRIDAY)}
//           className="main-day-btn"
//         >
//           금
//         </button>
//         <div className="main-tree-container">
//           <Tree degree={80} />
//         </div>
//       </div>
//       <div>
//         {dayToday === 0 ||
//           (dayToday === 6 && (
//             <Button className="long primary" label="회고하러 가기" />
//           ))}
//         <div className="main-todo-list">
//           <div className="main-todo-list-title">To Do</div>
//           <div className="main-todo-list-content">
//             {message ? (
//               <div>{message}</div>
//             ) : (
//               <div>
//                 <div title={selectDay}>{returnItemsForColumn(selectDay)}</div>
//                 <div title={selectDay} style={{ color: 'red' }}>
//                   {returnFinishedItemsForColumn(`${selectDay} 끝`)}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-end">
//           <Button
//             className="primary small "
//             label="일정 등록하기"
//             onClick={handleBranchPage}
//           />
//         </div>
//       </div>
//     </div>
//   </>
// )
