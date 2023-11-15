// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules'
import { UserBirth, UserName, UserProfileImg, UserRole } from '@/components'
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
        <img className="selectImg" src="public/tutorial/Seed.png" alt="" />
        <div className="signUpTitleTxt">저는 이런 사람입니다.</div>
      </div>
      <Swiper
        slidesPerView="auto"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        mousewheel
        keyboard
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        style={{ height: '85%', width: '100%' }}
      >
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
