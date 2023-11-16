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
  const dummyData = [
    {
      treeId: '21a4e16c-4d5c-4e6c-9b02-9597c57e3b6b',
      treeName: '나의 라임오렌지나무2',
      startedAt: '2023-10-09',
      endedAt: '2023-10-15',
      totalBudCount: 0,
      completedBudCount: 0,
    },
    {
      treeId: '72c2a348-321b-4e0b-98b5-bd6b8c178a14',
      treeName: '나의 라임오렌지나무4',
      startedAt: '2023-10-23',
      endedAt: '2023-10-29',
      totalBudCount: 0,
      completedBudCount: 0,
    },
    {
      treeId: '7f94c1da-5c9b-48d4-8e13-14094a82ad06',
      treeName: '나의 라임오렌지나무3',
      startedAt: '2023-10-16',
      endedAt: '2023-10-22',
      totalBudCount: 0,
      completedBudCount: 0,
    },
    {
      treeId: '9839fc1d-843c-491c-9a71-5c1b8efb22c7',
      treeName: '나의 라임오렌지나무5',
      startedAt: '2023-11-06',
      endedAt: '2023-11-12',
      totalBudCount: 5,
      completedBudCount: 3,
    },
  ]
  const trees =
    useSelector((state: RootState) => state.forest.trees) ?? dummyData
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
        {showTrees().map((tree: any) => (
          <Atropos className="atropos-forest-detail">
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
                        <img src={logImage} alt="" />
                      ) : tree.treeId ? (
                        <img src={smallTree} alt="" />
                      ) : (
                        <img src={mediumTree} alt="" />
                      )}
                    </div>
                    <div className="forest-detail-chart">
                      <DoughnutChart
                        centerText={`${
                          tree.totalBudCount === 0
                            ? 0
                            : (tree.completedBudCount / tree.totalBudCount) *
                              100
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
