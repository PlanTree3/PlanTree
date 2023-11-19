import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BarChart, DoughnutChart, PieChart, Tree } from '@/components'
import './TreePage.scss'
import { RootState } from '@/stores/store.ts'
import { LoadingPage } from '@/pages'

const TreePage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [])
  const {
    totalPercent,
    branchNames,
    branchTotalCount,
    branchDoneCount,
    notYet,
  } = useSelector((state: RootState) => state.forest.selectedInfo)
  const { degree, complete } = useSelector((state: RootState) => state.branch)
  const detailData = useSelector((state: RootState) => state.forest.detailData)
  return (
    <div className="tree-page">
      <div className="tree-page-title">
        {detailData.startedAt} ~ {detailData.endedAt}
      </div>
      <div className="tree-page-tree">
        {loading && <LoadingPage />}
        <Tree degree={degree} complete={complete} />
      </div>
      <div className="tree-page-title">통계</div>
      <div className="tree-page-chart-container">
        <div className="tree-page-chart">
          전체 달성도
          <DoughnutChart
            centerText={
              totalPercent === null ? 'Loading...' : `${totalPercent}%`
            }
            chartData={{
              data:
                totalPercent === null
                  ? [100, 0]
                  : [totalPercent, 100 - totalPercent],
            }}
          />
        </div>
        <div className="tree-page-chart">
          가지 분포
          {branchNames.length > 0 ? (
            <PieChart
              branchNames={branchNames}
              branchTotalCount={branchTotalCount}
            />
          ) : (
            <p>아직 생성된 가지가 없습니다.</p>
          )}
        </div>
        <div className="tree-page-chart">
          가지 별 달성도 차트
          {branchNames.length > 0 ? (
            <BarChart
              branchNames={branchNames}
              notYet={notYet}
              branchDoneCount={branchDoneCount}
            />
          ) : (
            <p>아직 생성된 가지가 없습니다.</p>
          )}
        </div>
      </div>
      <div className="tree-page-title">되돌아보기</div>
      <div>이번 주는 그래도 많은 계획을 달성했다</div>
    </div>
  )
}

export default TreePage
