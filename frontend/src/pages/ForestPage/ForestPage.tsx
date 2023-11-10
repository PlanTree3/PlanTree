import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import ForestCard from '@/components/ForestCard/ForestCard'
import './ForestPage.css'
import 'atropos/css'
import Button from '@/components/Button/Button'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

let forests = [
  {
    forestName: '놀러오세요 주영의 숲',
    year: 2020,
  },
  {
    forestName: '놀러오세요 도현의 숲',
    year: 2021,
  },
  {
    forestName: '튀어나와요 연재의 숲',
    year: 2022,
  },
  {
    forestName: '모여봐요 영석의 숲',
    year: 2023,
  },
]
forests = forests.sort((a, b) => b.year - a.year)

const ForestPage = () => {
  const [selected, setIndex] = useState(0)

  const handleSelect = (idx: number) => {
    setIndex(idx)
  }

  const slideChange = (e: any) => {
    setIndex(e.activeIndex)
  }

  return (
    <div className="forest-page-container">
      <div className="side-bar">
        {forests.map((forest, idx) => {
          return (
            <Button
              label={forest.year.toString()}
              className={selected === idx ? 'primary' : 'gray'}
              onClick={() => handleSelect(idx)}
            />
          )
        })}
        <Swiper
          direction="vertical"
          slidesPerView={1}
          mousewheel
          modules={[Mousewheel]}
          onSlideChange={slideChange}
          initialSlide={selected}
        >
          {forests.map((forest) => {
            return (
              <SwiperSlide>
                <div>
                  {forest.year} - {forest.forestName}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className="forest-card-container">
        <ForestCard
          nav={forests[selected].year}
          forestName={forests[selected].forestName}
        />
      </div>
    </div>
  )
}

export default ForestPage
