// import { useState } from 'react'
import './SignUp.scss'
import { userLogin } from '@/apis/member'

const UserProfileImg = () => {
  // const [inputProfileImg, setInputProfileImg] = useState<string>('')
  // const [modalIsOpen, setModalIsOpen] = useState(false)

  const saveUser = () => {
    // 임시로 userLogin 호출
    userLogin('이것은 임시입니다')
  }

  return (
    <div className="w-8/12 h-3/5 relative">
      <div className="bg-no-repeat w-full h-full bg-contain bg-[url('./asset/student_card/rm245-bb-17-g.jpg')]">
        <div className="rounded-full border-slate-950">학생</div>
        <div>이름</div>
        <div>나이</div>
        <div>생일</div>
      </div>
      <button className="absolute right-0" onClick={saveUser}>
        지금부터 숲을 가꿔보자!
      </button>
    </div>
  )
}

export default UserProfileImg
