// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules'
import { Tutorial1, Tutorial2, Tutorial3, LogIn } from '@/components'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './SlideStyle.css'

const Home = () => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      mousewheel
      keyboard
      modules={[Mousewheel, Pagination]}
      className="mySwiper"
      style={{ height: '600px', width: '100%' }}
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
      <SwiperSlide>
        <LogIn />
      </SwiperSlide>
    </Swiper>
  )
}

export default Home
