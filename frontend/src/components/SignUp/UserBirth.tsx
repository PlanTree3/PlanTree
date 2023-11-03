import React, { useState } from 'react'
// // 날짜 받는 라이브러리
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/esm/locale'

import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import '../DatePickerStyle.css'
import { useDispatch } from 'react-redux'
import { addBirthday } from '@/stores/features/signupSlice'

const UserBirth = () => {
  const [inputDate, setInputDate] = useState(new Date())
  const dispatch = useDispatch()

  const setDate = (date: Date) => {
    setInputDate(date)
    dispatch(addBirthday(date))
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
