// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules'
import { UserBirth, UserName, UserProfileImg, UserRule } from '@/components'
// style
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './SlideStyle.css'

const SignUpPage = () => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      mousewheel
      keyboard
      modules={[Mousewheel, Pagination]}
      className="mySwiper"
      style={{ height: '100px' }}
    >
      <SwiperSlide>
        <UserName />
      </SwiperSlide>
      <SwiperSlide>
        <UserBirth />
      </SwiperSlide>
      <SwiperSlide>
        <UserRule />
      </SwiperSlide>
      <SwiperSlide>
        <UserProfileImg />
      </SwiperSlide>
    </Swiper>
  )
}

export default SignUpPage
