import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { BarChart, DoughnutChart, PieChart, Tree, Button } from '@/components'
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
  const [degree, setDegree] = useState(0)
  const [complete, setComplete] = useState(0)
  useEffect(() => {
    console.log('기록을 보여줘', branchTotalCount, branchDoneCount)
    if (branchDoneCount && branchTotalCount) {
      let i = 0
      let j = 0
      let k = 0
      let x = 0
      branchTotalCount.forEach((cnt: number) => {
        i += cnt
      })
      branchDoneCount.forEach((cnt: number) => {
        j += cnt
      })
      x = Math.floor((j / i) * 100)
      if (i < 5) {
        k = 20
      } else if (i < 9) {
        k = 50
      } else {
        k = 80
      }
      if (x > k) {
        x = k
      }
      setDegree(k)
      setComplete(x)
    }
  }, [totalPercent])
  const detailData = useSelector((state: RootState) => state.forest.detailData)
  const role = useSelector((state: RootState) => state.user.userData?.role)
  return (
    <div className="tree-page">
      <div className="tree-page-title space-between">
        {detailData.startedAt} ~ {detailData.endedAt}
        {role === 'TEACHER' || role === 'PARENT' ? (
          <Link to={`/branch/${treeId}`}>
            <Button className="normal gray" label="일정 확인하기" />
          </Link>
        ) : (
          <Link to="/branch">
            <Button className="normal gray" label="일정 확인하기" />
          </Link>
        )}
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
      <div className="tree-page-container">
        <div className="tree-page-title">되돌아보기</div>
        <div>이번 주는 그래도 많은 계획을 달성했다</div>
      </div>
      <div className="tree-page-container">
        <div className="tree-page-title">기록</div>
        <ul className="tree-page-report-container">
          {Array.isArray(logData) &&
            logData.map((log: any, index: number) => (
              <li key={index}>
                <div className="tree-page-report-list">
                  {log.memberName}
                  {getLogTypeText(log.type, log.branchName, log.budName)}{' '}
                  <div>{log.createdAt}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default TreePage
