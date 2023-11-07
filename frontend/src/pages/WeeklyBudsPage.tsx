import { ChangeEvent, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBranches, addBuds, addSeeds } from '@/stores/features/branchSlice'
import { RootState } from '@/stores/store'
import { COLUMN_NAMES } from '@/types/DnDType'
import MovableItem from '@/components/MovableItem'
import Column from '../components/Column.tsx'
import '@/styles/branch.scss'
import Swal from "sweetalert2";

const WeeklyBudsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const buds = useSelector((state: RootState) => state.branch.buds)
  const branches = useSelector((state: RootState) => state.branch.branches)
  const [colors, setColors] = useState('')
  const [newText, setNewText] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [selectedBranchId, setSelectedBranchId] = useState(0)
  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragSeed = seeds[dragIndex]
    const dragBud = buds[dragIndex]
    if (dragSeed) {
      const updatedSeeds = [...seeds]
      const draggedItem = updatedSeeds.splice(dragIndex, 1)[0]
      updatedSeeds.splice(hoverIndex, 0, draggedItem)
      dispatch(addSeeds(updatedSeeds))
    }
    if (dragBud) {
      const updatedBuds = [...buds]
      const draggedItem = updatedBuds.splice(dragIndex, 1)[0]
      updatedBuds.splice(hoverIndex, 0, draggedItem)
      dispatch(addBuds(updatedBuds))
    }
  }
  const returnItemsForColumn = (columnName: string) => {
    const filteredSeeds = seeds.filter(
      (seed) => selectedBranchId === null || seed.branchId === selectedBranchId,
    )
    return (
      <div>
        <div>
          {filteredSeeds
            .filter((seed) => seed.dayOfWeek === columnName)
            .map((seed, index) => {
              return (
                <div key={seed.seedId}>
                  <MovableItem
                    id={seed.seedId}
                    idType="seed"
                    budName={seed.seedName}
                    comments={seed.comments}
                    index={index}
                    dayOfWeek={seed.dayOfWeek}
                    moveCardHandler={moveCardHandler}
                    color={seed.color}
                  />
                </div>
              )
            })}
        </div>
        <div>
          {buds
            .filter((bud) => bud.dayOfWeek === columnName)
            .map((bud, index) => {
              return (
                <div key={bud.budId}>
                  <MovableItem
                    id={bud.budId}
                    idType="bud"
                    budName={bud.budName}
                    comments={bud.comments}
                    index={index}
                    dayOfWeek={bud.dayOfWeek}
                    moveCardHandler={moveCardHandler}
                    color={bud.color}
                  />
                </div>
              )
            })}
        </div>
      </div>
    )
  }

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
        title: '가지를 선택해 주세요',
        icon: 'warning',
        iconColor: 'red',
      })
    }
  }
  const getRandomPastelColor = () => {
    const pastelColors: string[] = [
      '#FFC1CC',
      '#FFDAAF',
      '#FFFFBA',
      '#CAFFBF',
      '#AFDFFF',
      '#9ABAFF',
      '#D7AAFF',
      '#FFACE4',
      '#A7FFC4',
      '#ECD4FF',
    ]
    const randomIndex: number = Math.floor(Math.random() * pastelColors.length)
    return pastelColors[randomIndex]
  }
  const createBranch = () => {
    const maxId = branches.length + 927343
    const newItem = {
      branchId: maxId,
      branchName: newTitle,
      color: getRandomPastelColor(),
    }
    const newBranches = [...branches, newItem]
    dispatch(addBranches(newBranches))
    setNewTitle('')
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
            이게 맞니 기정기정
            <input type="text" value={newTitle} onChange={handleValueTitle} />
            <button onClick={createBranch}>가지 생성 버튼</button>
          </div>
          <div>
            가지 리스트 :
            <div>
              {branches.map((branch) => (
                <button
                  key={branch.branchId}
                  onClick={() =>
                    handleBranchSelect(branch.branchId, branch.color)
                  }
                  style={{
                    backgroundColor:
                      selectedBranchId === branch.branchId
                        ? 'gray'
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
          <div
            style={{
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            <div
              className="dnd_container"
              style={{
                width: '800px',
                height: '200px',
                backgroundColor: 'palegoldenrod',
              }}
            >
              <div>
                <input type="text" value={newText} onChange={handleValueText} />
                <button onClick={createItem}>씨앗 생성</button>
              </div>
              <div>{returnItemsForColumn(DEFAULT)}</div>
            </div>
          </div>
          <div className="dnd_container">
            <Column title={MONDAY} className="dnd_column dnd_column_shape1">
              {returnItemsForColumn(MONDAY)}
            </Column>
            <Column title={TUESDAY} className="dnd_column dnd_column_shape2">
              {returnItemsForColumn(TUESDAY)}
            </Column>
            <Column title={WEDNESDAY} className="dnd_column dnd_column_shape3">
              {returnItemsForColumn(WEDNESDAY)}
            </Column>
            <Column title={THURSDAY} className="dnd_column dnd_column_shape4">
              {returnItemsForColumn(THURSDAY)}
            </Column>
            <Column title={FRIDAY} className="dnd_column dnd_column_shape5">
              {returnItemsForColumn(FRIDAY)}
            </Column>
          </div>
          <div className="dnd_container">
            <Column
              title={MONDAY_FINISH}
              className="dnd_column dnd_column_shape1"
            >
              {returnItemsForColumn(MONDAY_FINISH)}
            </Column>
            <Column
              title={TUESDAY_FINISH}
              className="dnd_column dnd_column_shape2"
            >
              {returnItemsForColumn(TUESDAY_FINISH)}
            </Column>
            <Column
              title={WEDNESDAY_FINISH}
              className="dnd_column dnd_column_shape3"
            >
              {returnItemsForColumn(WEDNESDAY_FINISH)}
            </Column>
            <Column
              title={THURSDAY_FINISH}
              className="dnd_column dnd_column_shape4"
            >
              {returnItemsForColumn(THURSDAY_FINISH)}
            </Column>
            <Column
              title={FRIDAY_FINISH}
              className="dnd_column dnd_column_shape5"
            >
              {returnItemsForColumn(FRIDAY_FINISH)}
            </Column>
          </div>
        </div>
      </DndProvider>
      <button onClick={handleMainPage}>메인 페이지로</button>
    </>
  )
}
export default WeeklyBudsPage
