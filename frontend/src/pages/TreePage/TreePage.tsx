import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BarChart, DoughnutChart, PieChart, Tree } from '@/components'
import './TreePage.scss'
import { RootState } from '@/stores/store.ts'
import { LoadingPage } from '@/pages'
import { treeLog } from '@/apis'

const TreePage = () => {
  const [loading, setLoading] = useState(true)
  const [logData, setLogData] = useState<any[]>([])
  const { treeId } = useParams<{ treeId: string }>()

  // 나무 로그
  const handleLog = async () => {
    try {
      const response = await treeLog(treeId)
      console.log('로그 응답', response)
      setLogData(response.data.data.logs)
    } catch (error) {
      console.error('로그 에러:', error)
    }
  }

  // // 타입에 따른 문구
  const getLogTypeText = (
    type: string,
    branchName?: string,
    budName?: string,
  ) => {
    switch (type) {
      case 'STU_GEN_BUD':
        return ` 학생이 ${budName} 봉오리를 생성했어요`
      case 'STU_COM_BUD':
        return ` 학생이 ${budName} 봉오리를 완료했어요`
      case 'STU_GEN_BRA':
        return ` 학생이 ${branchName} 가지를 만들었어요`
      case 'PAR_GEN_BRA':
        return `부모가 ${branchName} 가지를 만들었어요`
      case 'TEA_GEN_BRA':
        return ` 선생이 ${branchName} 가지를 만들었어요`
      case 'STU_WRI_BUD':
        return ` 학생이 ${budName} 버드에 코멘트를 남겼어요`
      case 'PAR_WRI_BUD':
        return ` 부모가 ${budName} 버드에 코멘트를 남겼어요`
      case 'TEA_WRI_BUD':
        return ` 선생이 ${budName} 버드에 코멘트를 남겼어요`
      default:
        return '알 수 없는 타입'
    }
  }

  useEffect(() => {
    handleLog()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      console.log('로그 wfdfd', logData)
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
      <div className="tree-page-title">기록</div>
      <div>
        {Array.isArray(logData) &&
          logData.map((log: any, index: number) => (
            <div key={index}>
              {log.memberName}
              {getLogTypeText(log.type, log.branchName, log.budName)}{' '}
              {log.createdAt}
            </div>
          ))}
      </div>
    </div>
  )
}

export default TreePage
