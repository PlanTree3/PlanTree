import { useState } from 'react'
import './SignUp.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { userSignup } from '@/apis/member'

const UserProfileImg = () => {
  const [inputProfileImg, setInputProfileImg] = useState<string>('')
  const MySwal = withReactContent(Swal)

  const saveUser = () => {
    // 임시로 userLogin 호출
    userSignup('이것은 임시입니다')
  }

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
  }

  const moveProfileImg = () => {
    const content = (
      <button onClick={() => chooseProfileImg('src/asset/profile/bear.jpg')}>
        <img src="src/asset/profile/bear.jpg" alt="bear" />
      </button>
    )

    MySwal.fire({
      title: '당신의 원픽은?',
      html: content,
      width: 600,
    })
  }

  return (
    <div className="w-8/12 h-3/5 relative">
      <div className="bg-no-repeat w-full h-full bg-contain bg-[url('./asset/student_card/rm245-bb-17-g.jpg')]">
        <button onClick={() => moveProfileImg()}>
          {/* <input type="file" accept="image/*" onChange={handleFileUpload} /> */}
          모달 띄웁니다!
        </button>
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
