import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import { useDispatch, useSelector } from 'react-redux'
import ForestCard from '@/components/ForestCard/ForestCard'
import './ForestPage.css'
import 'atropos/css'
import Button from '@/components/Button/Button'
import 'swiper/css'
import 'swiper/css/pagination'
import { RootState } from '@/stores/store.ts'
import { getForestData } from '@/stores/features/forestSlice.ts'

const ForestPage = () => {
  const dummyData = [
    {
      forestId: '23e77f3c-30f1-4f64-a42c-8b42de61d0ed',
      startedAt: '2022-03-07',
      endedAt: '2023-03-05',
    },
    {
      forestId: '6b9cfd4c-e61a-4d2e-8ec5-55f92d2f5a19',
      startedAt: '2023-03-06',
      endedAt: '2024-03-03',
    },
  ]
  const forests =
    useSelector((state: RootState) => state.forest.forests) ?? dummyData
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getForestData())
  }, [])
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
              key={idx}
              label={forest.startedAt}
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
          {forests.map((forest, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div>{forest.startedAt} 나무</div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className="forest-card-container">
        <ForestCard
          nav={forests[selected].startedAt}
          forestName={forests[selected].startedAt}
        />
      </div>
    </div>
  )
}

export default ForestPage
