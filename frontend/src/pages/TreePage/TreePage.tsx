import { BarChart, DoughnutChart, PieChart, Tree } from '@/components'
import './TreePage.scss'

const TreePage = () => {
  return (
    <div className="tree-page">
      <div className="tree-page-title">언제부터 언제까지</div>
      <div className="tree-page-tree">
        <Tree />
      </div>
      <div className="tree-page-title">통계</div>
      <div className="tree-page-chart-container">
        <div className="tree-page-chart">
          전체 달성도
          <DoughnutChart
            centerText="87%"
            chartData={{
              data: [87, 13],
            }}
          />
        </div>
        <div className="tree-page-chart">
          가지 분포
          <PieChart />
        </div>
        <div className="tree-page-chart">
          가?지 요?일 별 달성도 차트
          <BarChart />
        </div>
      </div>
      <div className="tree-page-title">회고회고</div>
      <div>회고 맵돌리는 구간</div>
    </div>
  )
}

export default TreePage
