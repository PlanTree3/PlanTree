import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FiPlusCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import '@/styles/fontList.scss'
import '@/styles/profile.scss'
import './MyPageStyle.scss'

const MyPage = () => {
  const userName = useSelector((state: any) => state.user.nickname)
  const userRole = useSelector((state: any) => state.user.role)
  const userprofileImage = useSelector((state: any) => state.user.profileImage)
  const [inputProfileImg, setInputProfileImg] = useState<string>(
    userprofileImage || '',
  )
  const [inputUserRole, setInputUserRole] = useState<string>('')

  const MySwal = withReactContent(Swal)

  const imgList: string[] = [
    'bear',
    'cat',
    'frog',
    'monkey',
    'pig',
    'rabbit',
    'rat',
    'sheep',
    'tiger',
  ]

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
  }

  const showUserRole = () => {
    switch (userRole) {
      case 'STUDENT':
        return '학생'
      case 'TEACHER':
        return '선생님'
      case 'PARENT':
        return '학부모'
      default:
        return ''
    }
  }

  useEffect(() => {
    setInputUserRole(showUserRole())
  }, [userRole]) // userRole이 변경될 때만 실행

  const moveProfileImg = () => {
    const content = (
      <div className="mb-3.5">
        {imgList.map((img: string) => (
          <button
            key={img}
            className="selectImg p-0 mx-1"
            onClick={() => {
              chooseProfileImg(`public/profile/${img}.jpg`)
              MySwal.close() // 모달을 닫음
            }}
          >
            <img
              className="selectImg m-0"
              src={`public/profile/${img}.jpg`}
              alt={img}
            />
          </button>
        ))}
      </div>
    )

    MySwal.fire({
      html: content,
      width: 300,
      heightAuto: false,
      position: 'center',
      showConfirmButton: false,
      padding: 0,
    })
  }

  const bgColorClass = () => {
    switch (inputUserRole) {
      case '학생':
        return 'bg-teal-200'
      case '선생님':
        return 'bg-amber-400'
      case '학부모':
        return 'bg-lime-400'
      default:
        return ''
    }
  }

  //   const moveTutorial = () => {
  // navigate('')
  //   }

  return (
    <div className="outer-box">
      <div className="profileBox">
        <div className="profileImgBox w-full m-0">
          <img
            src={inputProfileImg}
            alt="유저이미지"
            className="w-2/5 h-2/5 mypage-image-container"
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button className="addImgBtn" onClick={() => moveProfileImg()}>
            <FiPlusCircle />
          </button>
        </div>
        <div className="profileImgBox pr-6 pt-3">
          {inputUserRole && (
            <div
              className={`m-2 w-max h-min border-2 rounded-full border-zinc-950 ${bgColorClass()}`}
            >
              <div className="mx-1 text-3xl">{inputUserRole}</div>
            </div>
          )}
          <div className="flex">
            <div className="text-5xl nanum">
              <div>{userName}</div>
            </div>
            <div className="nanum pt-2 pl-1 text-4xl content-end">님</div>
          </div>
        </div>
      </div>
      <div className="m-1">
        <button className="mypageButton">이번 주 통계 보기</button>
        <button className="mypageButton">전체 통계 보기</button>
        <button className="mypageButton">가정 통신문 보기</button>
        <button className="mypageButton">Plan Tree 100% 활용하기</button>
      </div>
    </div>
  )
}

export default MyPage
