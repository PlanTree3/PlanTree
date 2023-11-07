import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { ChangeEvent, useState } from 'react'
import { RootState } from '@/stores/store'
import { getRandomColor, ReturnItems } from '@/components'
import { COLUMN_NAMES } from '@/types/DnDType'
import { addBranches, addSeeds } from '@/stores/features/branchSlice'
import Column from '@/components/Column'

const ItemPlacement = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const branches = useSelector((state: RootState) => state.branch.branches)
  const [colors, setColors] = useState('')
  const [newText, setNewText] = useState('')
  const [newTitle, setNewTitle] = useState('')
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
  const handleValueText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value)
  }
  const handleValueTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }
  const createItem = () => {
    if (selectedBranchId) {
      if (newText.length >= 2) {
        const maxId = seeds.length + 90873
        const newItem = {
          seedId: maxId,
          seedName: newText,
          dayOfWeek: DEFAULT,
          branchId: selectedBranchId,
          color: colors,
        }
        const newSeeds = [...seeds, newItem]
        dispatch(addSeeds(newSeeds))
        setNewText('')
      } else {
        Swal.fire({
          title: '씨앗의 이름은 2글자 이상이어야 합니다.',
          icon: 'warning',
          iconColor: 'red',
        })
      }
    } else {
      Swal.fire({
        title: '가지를 선택해 주세요',
        icon: 'warning',
        iconColor: 'red',
      })
    }
  }
  const createBranch = () => {
    if (newTitle.length >= 2) {
      const maxId = branches.length + 927343
      const newItem = {
        branchId: maxId,
        branchName: newTitle,
        color: getRandomColor(),
      }
      const newBranches = [...branches, newItem]
      dispatch(addBranches(newBranches))
      setNewTitle('')
    } else {
      Swal.fire({
        title: '가지의 이름은 2글자 이상이어야 합니다.',
        icon: 'warning',
        iconColor: 'red',
      })
    }
  }
  const handleBranchSelect = (branchId: number, color: string) => {
    setSelectedBranchId(branchId)
    setColors(color)
  }
  const handleMainPage = () => {
    navigate('/main')
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <div>
            <input type="text" value={newTitle} onChange={handleValueTitle} />
            <button onClick={createBranch}>가지 생성 버튼</button>
          </div>
          <div>
            가지 리스트 :
            <div>
              {branches.map((branch: any) => (
                <button
                  key={branch.branchId}
                  onClick={() =>
                    handleBranchSelect(branch.branchId, branch.color)
                  }
                  style={{
                    backgroundColor:
                      selectedBranchId === branch.branchId
                        ? 'lightgray'
                        : branch.color,
                    color:
                      selectedBranchId === branch.branchId ? 'white' : 'black',
                  }}
                >
                  {branch.branchName}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div>
              <input type="text" value={newText} onChange={handleValueText} />
              <button onClick={createItem}>씨앗 생성</button>
              <div>{ReturnItems(DEFAULT, selectedBranchId)}</div>
            </div>
          </div>
          <div className="dnd_container">
            <Column title={MONDAY} className="dnd_column dnd_column_shape1">
              {ReturnItems(MONDAY, selectedBranchId)}
            </Column>
            <Column title={TUESDAY} className="dnd_column dnd_column_shape2">
              {ReturnItems(TUESDAY, selectedBranchId)}
            </Column>
            <Column title={WEDNESDAY} className="dnd_column dnd_column_shape3">
              {ReturnItems(WEDNESDAY, selectedBranchId)}
            </Column>
            <Column title={THURSDAY} className="dnd_column dnd_column_shape4">
              {ReturnItems(THURSDAY, selectedBranchId)}
            </Column>
            <Column title={FRIDAY} className="dnd_column dnd_column_shape5">
              {ReturnItems(FRIDAY, selectedBranchId)}
            </Column>
          </div>
          <div className="dnd_container">
            <Column
              title={MONDAY_FINISH}
              className="dnd_column dnd_column_shape1"
            >
              {ReturnItems(MONDAY_FINISH, selectedBranchId)}
            </Column>
            <Column
              title={TUESDAY_FINISH}
              className="dnd_column dnd_column_shape2"
            >
              {ReturnItems(TUESDAY_FINISH, selectedBranchId)}
            </Column>
            <Column
              title={WEDNESDAY_FINISH}
              className="dnd_column dnd_column_shape3"
            >
              {ReturnItems(WEDNESDAY_FINISH, selectedBranchId)}
            </Column>
            <Column
              title={THURSDAY_FINISH}
              className="dnd_column dnd_column_shape4"
            >
              {ReturnItems(THURSDAY_FINISH, selectedBranchId)}
            </Column>
            <Column
              title={FRIDAY_FINISH}
              className="dnd_column dnd_column_shape5"
            >
              {ReturnItems(FRIDAY_FINISH, selectedBranchId)}
            </Column>
          </div>
        </div>
      </DndProvider>
      <button onClick={handleMainPage}>메인 페이지로</button>
    </>
  )
}
export default ItemPlacement
