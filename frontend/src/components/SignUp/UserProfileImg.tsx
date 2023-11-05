import { useState } from 'react'
import './SignUp.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { LuImagePlus } from 'react-icons/lu'
import { userSignup } from '@/apis/member'
import { addProfileImg } from '@/stores/features/signupSlice'

const UserProfileImg = () => {
  const [inputProfileImg, setInputProfileImg] = useState<string>('')
  const [isProfileImg, setIsProfileImg] = useState<boolean>(false)
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const imgList: string[] = [
    'bear',
    'cat',
    'frog',
    'monkey',
    'pig',
    'rabit',
    'rat',
    'sheep',
    'tiger',
  ]

  const nameCheck = useSelector((state: any) => state.signup.profileImg)

  const saveUser = () => {
    // 임시로 userLogin 호출
    userSignup('이것은 임시입니다')
  }

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
    setIsProfileImg(true)
    dispatch(addProfileImg(url))
  }

  const moveProfileImg = () => {
    const content = (
      <div>
        {imgList.map((img: string) => (
          <button
            onClick={() => chooseProfileImg(`src/asset/profile/${img}.jpg`)}
          >
            <img
              className="selectImg"
              src={`src/asset/profile/${img}.jpg`}
              alt={img}
            />
          </button>
        ))}
      </div>
    )

    MySwal.fire({
      title: '당신의 원픽은?',
      html: content,
      width: 800,
    })
  }

  return (
    <div className="w-8/12 h-3/5 relative">
      <div className="flex bg-no-repeat w-full h-full bg-contain bg-[url('./asset/student_card/rm245-bb-17-g.jpg')]">
        <button className="profileImg" onClick={() => moveProfileImg()}>
          {isProfileImg ? (
            <img
              className="p-0 w-full h-full"
              src={inputProfileImg}
              alt={inputProfileImg}
            />
          ) : (
            <LuImagePlus size="40" />
          )}
        </button>
        <span>
          <div className="rounded-full border-slate-950">학생</div>
          <div>이름</div>
          <div>나이</div>
          <div>생일</div>
        </span>
      </div>
      <button className="absolute right-0" onClick={saveUser}>
        지금부터 숲을 가꿔보자!
      </button>
    </div>
  )
}

export default UserProfileImg
