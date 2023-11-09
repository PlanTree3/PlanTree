import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import plusIcon from '../../../public/asset/btn/plusIcon.svg'
import writeIcon from '../../../public/asset/btn/writeIcon.svg'
import { RootState } from '@/stores/store'
import { getRandomColor, ReturnItems } from '@/components'
import { COLUMN_NAMES } from '@/types/DnDType'
import { addBranches, addSeeds } from '@/stores/features/branchSlice'
import Column from '@/components/Column'

const ItemPlacement = () => {
  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const branches = useSelector((state: RootState) => state.branch.branches)
  const [colors, setColors] = useState('ffffff')
  const [newText, setNewText] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [selectedBranchId, setSelectedBranchId] = useState(0)
  const [open, setOpen] = useState(false)
  const [openSeed, setOpenSeed] = useState(false)
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
        setOpenSeed(false)
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
      setOpen(false)
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

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpenCreateSeed = () => {
    setOpenSeed(true)
  }
  const handleCloseCreateSeed = () => {
    setOpenSeed(false)
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dnd-box-container">
        <div className="dnd-create-btn-box">
          <button className="dnd-add-branch-btn" onClick={handleClickOpen}>
            <img src={plusIcon} alt="추가" />
          </button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>가지 만들기</DialogTitle>
            <DialogContent>
              <DialogContentText>
                새로운 일정을 등록할 가지를 입력해주세요
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="가지 이름"
                type="text"
                fullWidth
                variant="standard"
                value={newTitle}
                onChange={handleValueTitle}
              />
            </DialogContent>
            <DialogActions>
              <button onClick={handleClose}>취소</button>
              <button onClick={createBranch}>등록</button>
            </DialogActions>
          </Dialog>
          <button
            className="dnd-add-seed-btn"
            onClick={handleClickOpenCreateSeed}
          >
            <img src={writeIcon} alt="추가" />
          </button>
          <Dialog open={openSeed} onClose={handleCloseCreateSeed}>
            <DialogTitle>씨앗 만들기</DialogTitle>
            <DialogContent>
              <DialogContentText>
                새로운 일정을 입력 해주세요!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="씨앗 이름"
                type="text"
                fullWidth
                variant="standard"
                value={newText}
                onChange={handleValueText}
              />
            </DialogContent>
            <DialogActions>
              <button onClick={handleCloseCreateSeed}>취소</button>
              <button onClick={createItem}>등록</button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="dnd-branch-box">
          {branches.map((branch: any) => (
            <button
              key={branch.branchId}
              className="dnd-branch-btn"
              onClick={() => handleBranchSelect(branch.branchId, branch.color)}
              style={{
                backgroundColor:
                  selectedBranchId === branch.branchId
                    ? 'lightgray'
                    : branch.color,
                color: selectedBranchId === branch.branchId ? 'white' : 'black',
                zIndex: selectedBranchId === branch.branchId ? 2 : 1,
              }}
            >
              {branch.branchName}
            </button>
          ))}
        </div>
        <div
          style={{ backgroundColor: 'lightgray' }}
          className="dnd-seed-outer-container"
        >
          {ReturnItems(DEFAULT, selectedBranchId)}
        </div>
        <div className="dnd_container">
          <p>월</p>
          <p>화</p>
          <p>수</p>
          <p>목</p>
          <p>금</p>
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
  )
}
export default ItemPlacement
