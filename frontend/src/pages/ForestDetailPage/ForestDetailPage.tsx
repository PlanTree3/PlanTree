import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoughnutChart } from '@/components'
import './ForestDetailPage.scss'
import Button from '@/components/Button/Button'

const ForestDetailPage = () => {
  const [startedAt, setStartedAt] = useState('')
  const [endedAt, setEndedAt] = useState('')
  const navigate = useNavigate()
  const handleTreeBox = (treeId: number) => {
    navigate(`/tree/${treeId}`)
  }

  const startedAtOnChange = (e: any) => {
    setStartedAt(e.target.value)
  }
  const endedAtOnChange = (e: any) => {
    setEndedAt(e.target.value)
  }

  const handleSearchBtn = () => {
    console.log(startedAt, endedAt)
  }

  return (
    <div className="forest-detail-page-container">
      <div className="forest-detail-date-input">
        <div className="forest-detail-title">나의 나무</div>
        <div className="forest-detail-filter">
          <input type="date" id="start" onChange={startedAtOnChange} /> 부터
          <input type="date" id="end" onChange={endedAtOnChange} /> 까지
          <Button
            label="검색하기"
            className="xxsmall"
            onClick={handleSearchBtn}
          />
        </div>
      </div>
      <div className="forest-detail-tree-container">
        {/* 대충 여기서 반복문 돌리면 된다는 주석 */}
        <div className="forest-detail-tree-box">
          <div className="forest-detail-tree">
            <img src="/public/plantree2.jpg" alt="" />
          </div>
          <div className="forest-detail-chart">
            <div className="forest-detail-chart-title">
              <div className="text-lg">나나무</div>
              <Button
                label="자세히 보기"
                onClick={() => handleTreeBox(1)}
                className="xxsmall primary"
              />
            </div>
            <DoughnutChart
              centerText="87%"
              chartData={{
                data: [87, 13],
              }}
            />
          </div>
        </div>
        <div className="forest-detail-tree-box">
          <div className="forest-detail-tree">
            <img src="/public/plantree2.jpg" alt="" />
          </div>
          <div className="forest-detail-chart">
            나무나무 나나무
            <DoughnutChart
              centerText="90%"
              chartData={{
                data: [90, 10],
              }}
            />
          </div>
        </div>
        <div className="forest-detail-tree-box">
          <div className="forest-detail-tree">
            <img src="/public/plantree2.jpg" alt="" />
          </div>
          <div className="forest-detail-chart">
            나무나무 나나무
            <DoughnutChart
              centerText="50%"
              chartData={{
                data: [50, 50],
              }}
            />
          </div>
        </div>
        <div className="forest-detail-tree-box">
          <div className="forest-detail-tree">
            <img src="/public/plantree2.jpg" alt="" />
          </div>
          <div className="forest-detail-chart">
            나무나무 나나무
            <DoughnutChart
              centerText="64%"
              chartData={{
                data: [64, 36],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForestDetailPage
