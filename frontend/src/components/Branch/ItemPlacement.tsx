import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { isMobile } from 'react-device-detect'
import { ChangeEvent, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { RootState } from '@/stores/store'
import { Button, getRandomColor, ReturnItems } from '@/components'
import { COLUMN_NAMES } from '@/types/DnDType'
import { addBranches, addSeeds } from '@/stores/features/branchSlice'
import Column from '@/components/Column'

const ItemPlacement = () => {
  const backendForDND = isMobile ? TouchBackend : HTML5Backend
  // const backendForDND = TouchBackend
  const backendOptions = {
    delayTouchStart: 200, // 드래그 시작 전의 지연 시간 (밀리초)
    enableMouseEvents: true, // 마우스 이벤트 활성화
  }

  const dispatch = useDispatch()
  const seeds = useSelector((state: RootState) => state.branch.seeds)
  const branches = useSelector((state: RootState) => state.branch.branches)
  const treeId = useSelector((state: RootState) => state.main.treeId)
  const [colors, setColors] = useState('lightgray')
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
  useEffect(() => {
    if (!treeId) {
      window.location.href = '/main'
    }
  })

  function generateRandomString(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const length = 10
    let result = ''
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const handleValueText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value)
  }
  const handleValueTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }
  const createItem = () => {
    if (selectedBranchId && seeds) {
      if (newText.length >= 2) {
        const maxId = generateRandomString()
        const newItem = {
          seedId: maxId,
          seedName: newText,
          dayOfWeek: DEFAULT,
          branchId: selectedBranchId,
          branchColor: colors,
        }
        const newSeeds = [...seeds, newItem]
        const { seedId, ...createdItem } = newItem
        const data = {
          newSeeds,
          createdItem,
        }
        dispatch(addSeeds(data))
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
    if (newTitle.length >= 2 && branches) {
      const maxId = generateRandomString()
      const newItem = {
        branchId: maxId,
        branchName: newTitle,
        color: getRandomColor(),
      }
      const newBranches = [...branches, newItem]
      const { branchId, ...createdItem } = newItem
      const data = {
        newBranches,
        createdItem,
      }
      dispatch(addBranches(data))
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

  useEffect(() => {
    if (branches) {
      handleBranchSelect(branches[0].branchId, branches[0].branchColor)
    }
  }, branches)

  return (
    <DndProvider backend={backendForDND} options={backendOptions}>
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
                  color:
                    selectedBranchId === branch.branchId ? 'white' : 'black',
                  zIndex: selectedBranchId === branch.branchId ? 2 : 1,
                }}
              >
                {branch.branchName}
              </button>
            ))}
          </div>
          <Button
            onClick={handleClickOpen}
            className="lime small w-[9vw]"
            label="가지 만들기"
          />

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
              <Button
                className="red small"
                onClick={handleClose}
                label="취소"
              />
              <Button
                className="primary small"
                onClick={createBranch}
                label="등록"
              />
            </DialogActions>
          </Dialog>
        </div>
        <div
          style={{ border: `0.3vw solid ${colors}` }}
          className="dnd-seed-outer-container"
        >
          <div className="dnd-seed-outer-box">
            {ReturnItems(DEFAULT, selectedBranchId)}
          </div>
          <div className="dnd-seed-create-btn">
            <Button
              className="lime small"
              onClick={handleClickOpenCreateSeed}
              label="씨앗 만들기"
            />
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
                <Button
                  className="red small"
                  onClick={handleCloseCreateSeed}
                  label="취소"
                />
                <Button
                  className="primary small"
                  onClick={createItem}
                  label="등록"
                />
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="dnd_container">
          <div className="dnd_container-text">월</div>
          <div className="dnd_container-text">화</div>
          <div className="dnd_container-text">수</div>
          <div className="dnd_container-text">목</div>
          <div className="dnd_container-text">금</div>
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
