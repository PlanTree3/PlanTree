/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Atropos from 'atropos/react'
import { DoughnutChart } from '@/components'
import './ForestDetailPage.scss'
import Button from '@/components/Button/Button'
import { RootState } from '@/stores/store'
import { getTreeDetailData } from '@/stores/features/forestSlice.ts'
import greenBackground from '../../../public/greenBackGround.jfif'
import logImage from '../../../public/models/tree/log.png'
import smallTree from '../../../public/models/tree/smallTree.png'
import mediumTree from '../../../public/models/tree/mediumTree.png'
import { getBranchData } from '@/stores/features/branchSlice.ts'

const ForestDetailPage = () => {
  const trees = useSelector((state: RootState) => state.forest.trees)
  const [filterType, setFilterType] = useState('start')
  const [startedAt, setStartedAt] = useState('')
  const [endedAt, setEndedAt] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleTreeBox = (treeId: string) => {
    dispatch(getTreeDetailData(treeId))
    dispatch(getBranchData())
    setTimeout(() => {
      navigate(`/tree/${treeId}`)
    }, 0)
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
  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value)
  }

  const isValidDate = (x: Date) => {
    return !Number.isNaN(x.getTime())
  }
  const filteredTrees = trees.filter((tree) => {
    const treeStart = new Date(tree.startedAt)
    const treeEnd = new Date(tree.endedAt)
    const start = new Date(startedAt)
    const end = new Date(endedAt)

    if (filterType === 'start') {
      if (isValidDate(start) && isValidDate(end)) {
        return treeStart >= start && treeStart <= end
      }
      if (isValidDate(start) && !isValidDate(end)) {
        return treeStart >= start
      }
      return treeStart <= end
    }
    // filterType === 'end'
    if (isValidDate(start) && isValidDate(end)) {
      return treeEnd >= start && treeEnd <= end
    }
    if (isValidDate(start) && !isValidDate(end)) {
      return treeEnd >= start
    }
    return treeEnd <= end
  })

  const showTrees = () => {
    if (startedAt || endedAt) {
      return filteredTrees
    }
    return trees
  }

  return (
    <div className="forest-detail-page-container">
      <div className="forest-detail-date-input">
        <div className="forest-detail-title">나의 나무</div>
        <div className="forest-detail-filter">
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="start">시작일자 기준</option>
            <option value="end">끝 일자 기준</option>
          </select>
          <input type="date" id="start" onChange={startedAtOnChange} /> 부터
          <input type="date" id="end" onChange={endedAtOnChange} /> 까지
          <Button
            label="검색하기"
            className="small lime"
            onClick={handleSearchBtn}
          />
        </div>
      </div>
      <div className="forest-detail-tree-container">
        {showTrees().map((tree: any, index: number) => (
          <Atropos className="atropos-forest-detail" key={index}>
            <div className="atropos-component">
              <div className="atropos-inner">
                <img
                  className="atropos-spacer"
                  src={greenBackground}
                  alt="sky"
                />
                <img
                  style={{
                    opacity: '0.5',
                  }}
                  data-atropos-offset="-4.5"
                  src={greenBackground}
                  alt="sky"
                />
                <div
                  data-atropos-offset="0"
                  className="forest-text-area py-[2vh]"
                >
                  <div className="text-lg text-black">{tree.treeName}</div>
                  <div key={tree.treeId} className="forest-detail-tree-box">
                    <div className="forest-detail-tree">
                      {!tree.treeId ? (
                        <img src={logImage} alt="아주작은나무" />
                      ) : tree.treeId ? (
                        <img src={smallTree} alt="작은나무" />
                      ) : (
                        <img src={mediumTree} alt="중간나무" />
                      )}
                    </div>
                    <div className="forest-detail-chart">
                      <DoughnutChart
                        centerText={`${
                          tree.totalBudCount === 0
                            ? 0
                            : Math.floor(
                                (tree.completedBudCount / tree.totalBudCount) *
                                  100,
                              )
                        }%`}
                        chartData={{
                          data:
                            tree.totalBudCount === 0
                              ? [0, 100]
                              : [
                                  (tree.completedBudCount /
                                    tree.totalBudCount) *
                                    100,
                                  100 -
                                    (tree.completedBudCount /
                                      tree.totalBudCount) *
                                      100,
                                ],
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    label="자세히 보기"
                    onClick={() => handleTreeBox(tree.treeId)}
                    className="normal primary h-[5vh]"
                  />
                </div>
              </div>
            </div>
          </Atropos>
        ))}
      </div>
    </div>
  )
}
export default ForestDetailPage
