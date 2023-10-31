import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { UserBirth, UserName, UserProfileImg, UserRule } from '@/components'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import './styles.css'

// import required modules
import { Pagination } from 'swiper/modules'

const SignUpPage = () => {

  // 여기부터는 싸피가서 디버깅하기
  const swiperRef = useRef(null); // Swiper의 ref를 생성
  const [inputName, setInputName] = useState<string>(''); // 사용자 이름 입력 상태
  const [canChangeSlide, setCanChangeSlide] = useState(true); // 슬라이드 전환 허용 상태

  const handleSlideChange = (swiper) => {
    // 슬라이드 변경 시 호출되는 콜백 함수
    // 여기서 원하는 조건을 확인하고 슬라이드를 변경하거나 막을 수 있습니다.

    // 예를 들어, 현재 슬라이드가 1이고 특정 조건을 확인하여
    // 슬라이드 2로 넘어가지 않도록 막을 수 있습니다.

    if (swiper.activeIndex === 0) {
      // 사용자 이름 슬라이드인 경우
      if (inputName.length > 10) {
        // 이름이 10자를 넘는 경우 슬라이드 전환을 막음
        setCanChangeSlide(false);
      } else {
        // 이름이 10자 이하인 경우 슬라이드 전환을 허용
        setCanChangeSlide(true);
      }
    }
  }
  return (
    <>
        <Swiper
          ref={swiperRef} // Swiper의 ref를 연결
          onSlideChange={handleSlideChange} // 슬라이드 변경 이벤트 핸들러 등록
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
        >
        <SwiperSlide><UserName setInputName={setInputName}/></SwiperSlide>
        <SwiperSlide><UserBirth /></SwiperSlide>
        <SwiperSlide><UserRule /></SwiperSlide>
        <SwiperSlide><UserProfileImg /></SwiperSlide>
      </Swiper>
    </>
  )
}

export default SignUpPage
