// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Pagination } from 'swiper/modules'
import { UserBirth, UserName, UserProfileImg, UserRule } from '@/components'

const SignUpPage = () => {
  return (
    <>
      <Swiper pagination modules={[Pagination]} className="mySwiper">
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
      <div>sdfsf</div>
    </>
  )
}

export default SignUpPage
