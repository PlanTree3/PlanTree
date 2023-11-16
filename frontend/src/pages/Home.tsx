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
      slidesPerView="auto"
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      mousewheel
      keyboard
      modules={[Mousewheel, Pagination]}
    >
      <SwiperSlide className="max-w-[100%]">
        <Tutorial1 />
      </SwiperSlide>
      <SwiperSlide>
        <Tutorial2 />
      </SwiperSlide>
      <SwiperSlide>
        <Tutorial3 forestName="알아서 작성해보아요" />
      </SwiperSlide>
      <SwiperSlide>
        <LogIn />
      </SwiperSlide>
    </Swiper>
  )
}

export default Home
