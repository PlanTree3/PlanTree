import React, { useState } from 'react'
// // 날짜 받는 라이브러리
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import '../DatePickerStyle.css'

const UserBirth = () => {
  const [inputDate, setInputDate] = useState(new Date())

  const setDate = (date: Date) => {
    setInputDate(date)
    console.log(inputDate)
  }

  return (
    <>
      <LiaBirthdayCakeSolid />
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={inputDate}
        shouldCloseOnSelect
        onChange={setDate}
        disabledKeyboardNavigation
      />
    </>
  )
}

export default UserBirth