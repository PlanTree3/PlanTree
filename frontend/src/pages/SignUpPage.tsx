// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules'
import {
  Tutorial1,
  Tutorial2,
  Tutorial3,
  UserBirth,
  UserName,
  UserProfileImg,
  UserRole,
} from '@/components'
// style
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './SlideStyle.css'
import '../components/SignUp/SignUp.scss'

const SignUpPage = () => {
  return (
    <>
      <div className="signUpTitle">
        <img className="selectImg" src="/tutorial/Seed.png" alt="seed" />
        <div className="signUpTitleTxt">저는 이런 사람입니다.</div>
      </div>
      <Swiper
        slidesPerView="auto"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        mousewheel
        keyboard
        modules={[Mousewheel, Pagination]}
        style={{ height: '90%', width: '100%' }}
      >
        <SwiperSlide className="max-w-[100%]">
          <Tutorial1 />
        </SwiperSlide>
        <SwiperSlide>
          <Tutorial2 />
        </SwiperSlide>
        <SwiperSlide>
          <Tutorial3 forestName="그럼 지금부터 숲을 만들러 가 볼까요?" />
        </SwiperSlide>
        <SwiperSlide>
          <UserName />
        </SwiperSlide>
        <SwiperSlide>
          <UserBirth />
        </SwiperSlide>
        <SwiperSlide>
          <UserRole />
        </SwiperSlide>
        <SwiperSlide>
          <UserProfileImg />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default SignUpPage
