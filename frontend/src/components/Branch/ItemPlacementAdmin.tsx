import { useSelector } from 'react-redux'
import { useState } from 'react'
import { RootState } from '@/stores/store'
import { ReturnItemsAdmin } from '@/components'
import { COLUMN_NAMES } from '@/types/DnDType'

const ItemPlacementAdmin = () => {
  const branches = useSelector((state: RootState) => state.branch.branches)
  // const treeId = useSelector((state: RootState) => state.main.treeId)
  const [colors, setColors] = useState('lightgray')
  const [selectedBranchId, setSelectedBranchId] = useState(0)
  const {
    DEFAULT,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    MONDAY_FINISH,
    TUESDAY_FINISH,
    WEDNESDAY_FINISH,
    THURSDAY_FINISH,
    FRIDAY_FINISH,
  } = COLUMN_NAMES

  const handleBranchSelect = (branchId: number, color: string) => {
    setSelectedBranchId(branchId)
    setColors(color)
  }
  return (
    <div className="dnd-box-container">
      <div className="dnd-branch-container">
        <div className="dnd-branch-box">
          {branches?.map((branch: any) => (
            <button
              key={branch.branchId}
              className="dnd-branch-btn"
              onClick={() =>
                handleBranchSelect(branch.branchId, branch.branchColor)
              }
              style={{
                border: `3px solid ${branch.branchColor}`,
                borderBottom: '0',
                backgroundColor:
                  selectedBranchId !== branch.branchId
                    ? ''
                    : branch.branchColor,
                color: selectedBranchId === branch.branchId ? 'white' : 'black',
                zIndex: selectedBranchId === branch.branchId ? 2 : 1,
              }}
            >
              {branch.branchName}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{ border: `0.3vw solid ${colors}` }}
        className="dnd-seed-outer-container"
      >
        <div className="dnd-seed-outer-box">
          {ReturnItemsAdmin(DEFAULT, selectedBranchId)}
        </div>
      </div>
      <div className="dnd_container">
        <div
          className="dnd_container-text"
          style={{
            gridArea: 'mon',
          }}
        >
          월
        </div>
        <div
          className="dnd_container-text"
          style={{
            gridArea: 'tue',
          }}
        >
          화
        </div>
        <div
          className="dnd_container-text"
          style={{
            gridArea: 'wed',
          }}
        >
          수
        </div>
        <div
          className="dnd_container-text"
          style={{
            gridArea: 'thu',
          }}
        >
          목
        </div>
        <div
          className="dnd_container-text"
          style={{
            gridArea: 'fri',
          }}
        >
          금
        </div>
      </div>
      <div className="dnd_container">
        <div
          className="flex justify-center items-center py-1 border-[3px] rounded-r-[1vw]"
          style={{
            writingMode: 'vertical-lr',
            boxShadow: '2px 2px 5px 3px #999',
            gridArea: 'a',
          }}
        >
          진행중
        </div>
        <div title={MONDAY} className="dnd_column dnd_column_shape1">
          {ReturnItemsAdmin(MONDAY, selectedBranchId)}
        </div>
        <div title={TUESDAY} className="dnd_column dnd_column_shape2">
          {ReturnItemsAdmin(TUESDAY, selectedBranchId)}
        </div>
        <div title={WEDNESDAY} className="dnd_column dnd_column_shape3">
          {ReturnItemsAdmin(WEDNESDAY, selectedBranchId)}
        </div>
        <div title={THURSDAY} className="dnd_column dnd_column_shape4">
          {ReturnItemsAdmin(THURSDAY, selectedBranchId)}
        </div>
        <div title={FRIDAY} className="dnd_column dnd_column_shape5">
          {ReturnItemsAdmin(FRIDAY, selectedBranchId)}
        </div>
      </div>
      <div className="dnd_container">
        <div
          className="flex justify-center items-center py-1 border-[3px] rounded-r-[1vw]"
          style={{
            writingMode: 'vertical-lr',
            boxShadow: '2px 2px 5px 3px #999',
            gridArea: 'a',
          }}
        >
          완료
        </div>
        <div title={MONDAY_FINISH} className="dnd_column dnd_column_shape1">
          {ReturnItemsAdmin(MONDAY_FINISH, selectedBranchId)}
        </div>
        <div title={TUESDAY_FINISH} className="dnd_column dnd_column_shape2">
          {ReturnItemsAdmin(TUESDAY_FINISH, selectedBranchId)}
        </div>
        <div title={WEDNESDAY_FINISH} className="dnd_column dnd_column_shape3">
          {ReturnItemsAdmin(WEDNESDAY_FINISH, selectedBranchId)}
        </div>
        <div title={THURSDAY_FINISH} className="dnd_column dnd_column_shape4">
          {ReturnItemsAdmin(THURSDAY_FINISH, selectedBranchId)}
        </div>
        <div title={FRIDAY_FINISH} className="dnd_column dnd_column_shape5">
          {ReturnItemsAdmin(FRIDAY_FINISH, selectedBranchId)}
        </div>
      </div>
    </div>
  )
}
export default ItemPlacementAdmin
