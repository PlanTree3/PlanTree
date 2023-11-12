import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FiPlusCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
// import { noticeList } from '@/apis/communication/notice'
import {
  Tutorial1,
  Tutorial2,
  Tutorial3,
  BarChart,
  DoughnutChart,
  PieChart,
} from '@/components'
import '@/styles/fontList.scss'
import '@/styles/profile.scss'
import './MyPageStyle.scss'
import { userImageUpdate } from '@/apis'
import { addProfileImageUrl } from '@/stores/features/userSlice'
import Button from '@/components/Button/Button'

const MyPage = () => {
  const userName = useSelector((state: any) => state.user.userData.name)
  const userRole = useSelector((state: any) => state.user.userData.role)
  const userprofileImage = useSelector(
    (state: any) => state.user.userData.profileImageUrl,
  )
  const [inputProfileImg, setInputProfileImg] =
    useState<string>(userprofileImage)
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
    addProfileImageUrl(url)
    console.log('mypage의 profileImg 변경입니다.: ', url)

    const data = {
      profileImageUrl: url,
    }

    userImageUpdate(data)
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
    // setInputProfileImg(userprofileImage)
  }, []) // userRole이 변경될 때만 실행

  // 프로필 이미지 모달
  const moveProfileImg = () => {
    const content = (
      <div>
        {/* className="mb-3.5" */}
        {imgList.map((img: string) => (
          <button
            key={img}
            // className="selectImg p-0 mx-1"
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
      width: '27%',
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

  // 튜토리얼 모달
  const moveTutorial = () => {
    const content = (
      <Swiper
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        mousewheel
        keyboard
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        style={{ height: '500px', width: '100%' }}
      >
        <SwiperSlide>
          <Tutorial1 />
        </SwiperSlide>
        <SwiperSlide>
          <Tutorial2 />
        </SwiperSlide>
        <SwiperSlide>
          <Tutorial3 />
        </SwiperSlide>
      </Swiper>
    )

    MySwal.fire({
      title: 'Plan Tree 100% 활용하기',
      html: content,
      position: 'center',
      width: '70%',
      heightAuto: false,
      padding: 0,
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'py-0', // 새로운 클래스 이름을 지정합니다.
      },
    })
  }

  // 가정통신문 모달
  const moveNewsList = () => {
    // 여기서 개인의 가정통신문 불러오는 axios 만들기
    interface Notice {
      title: string
      groupName: string
      date: Date
    }
    // const newsList: Notice[] = noticeList()
    const newsList: Notice[] = [
      {
        title: '플젝이',
        groupName: '벌써',
        date: new Date(),
      },
    ]

    const newsListDate = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      return [year, month, day].join('-')
    }

    const content = (
      <table className="table-fixed">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>그룹명</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news, idx) => {
            return (
              <tr>
                <td>{idx}</td>
                <td>{news.title}</td>
                <td>{news.groupName}</td>
                <td>{newsListDate(news.date)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )

    MySwal.fire({
      title: '가정통신문 보기',
      html: content,
      position: 'center',
      width: '70%',
      heightAuto: false,
      padding: 0,
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'py-0', // 새로운 클래스 이름을 지정합니다.
      },
    })
  }

  // 이번 주 통계 보기
  const moveChart = () => {
    const content = (
      <div className="grid grid-cols-3">
        <div>
          <BarChart />
        </div>
        <div>
          <DoughnutChart
            centerText="87%"
            chartData={{
              data: [87, 13],
            }}
          />
        </div>
        <div>
          <PieChart />
        </div>
      </div>
    )

    MySwal.fire({
      title: '이번주 통계 보기',
      html: content,
      position: 'center',
      width: '70%',
      heightAuto: false,
      padding: 0,
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'py-0', // 새로운 클래스 이름을 지정합니다.
      },
    })
  }

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
      <div className="mypage-btn-container">
        <Button
          className="long primary block"
          label="이번 주 통계 보기"
          onClick={moveChart}
        />
        <Button
          className="long primary block"
          label="가정 통신문 보기"
          onClick={moveNewsList}
        />
        <Button
          className="long primary block"
          label="Plan Tree 100% 활용하기"
          onClick={moveTutorial}
        />
      </div>
    </div>
  )
}

export default MyPage
