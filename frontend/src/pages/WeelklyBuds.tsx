import { ChangeEvent, useEffect, useState } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { tasks } from '@/components/Tasks'
import { COLUMN_NAMES } from '@/types/DnDType'
import MovableItem from '@/components/MovableItem'
import Column from '../components/Column.tsx'
import '@/styles/branch.scss'

const WeeklyBuds = () => {
  const [items, setItems] = useState(tasks)
  const [newText, setNewText] = useState('')
  useEffect(() => {
    items.map((item) => (console.log(item.budName, item.budId, item.dayOfWeek)))
  }, [items])
  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex]
    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState]
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)
        coppiedStateArray.splice(dragIndex, 1, prevItem[0])
        return coppiedStateArray
      })
    }
  }
  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item) => item.dayOfWeek === columnName)
      .map((item, index) => {
        return (
          <div key={item.budId}>
            <MovableItem
              id={item.budId}
              budName={item.budName}
              setItems={setItems}
              index={index}
              dayOfWeek={item.dayOfWeek}
              moveCardHandler={moveCardHandler}
            />
          </div>
        )
      })
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
  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  }
  const createItem = () => {
    const maxId = items.length + 90873
    const newItem = {
      budId: maxId,
      budName: newText,
      dayOfWeek: DEFAULT,
    }
    setItems((prevItems) => [...prevItems, newItem])
    setNewText('')
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div
          style={{ alignItems: 'center', textAlign: 'center', display: 'flex' }}
        >
          <div
            className="container"
            style={{
              width: '800px',
              height: '200px',
              backgroundColor: 'palegoldenrod',
            }}
          >
            <div>
              <input type="text" value={newText} onChange={handleValue} />
              <button onClick={createItem}>생성</button>
            </div>
            <div>{returnItemsForColumn(DEFAULT)}</div>
          </div>
        </div>
        <div className="container">
          <Column title={MONDAY} className="column first-column">
            {returnItemsForColumn(MONDAY)}
          </Column>
          <Column title={TUESDAY} className="column second-column">
            {returnItemsForColumn(TUESDAY)}
          </Column>
          <Column title={WEDNESDAY} className="column first-column">
            {returnItemsForColumn(WEDNESDAY)}
          </Column>
          <Column title={THURSDAY} className="column second-column">
            {returnItemsForColumn(THURSDAY)}
          </Column>
          <Column title={FRIDAY} className="column first-column">
            {returnItemsForColumn(FRIDAY)}
          </Column>
        </div>
        <div className="container">
          <Column title={MONDAY_FINISH} className="column first-column">
            {returnItemsForColumn(MONDAY_FINISH)}
          </Column>
          <Column title={TUESDAY_FINISH} className="column second-column">
            {returnItemsForColumn(TUESDAY_FINISH)}
          </Column>
          <Column title={WEDNESDAY_FINISH} className="column first-column">
            {returnItemsForColumn(WEDNESDAY_FINISH)}
          </Column>
          <Column title={THURSDAY_FINISH} className="column second-column">
            {returnItemsForColumn(THURSDAY_FINISH)}
          </Column>
          <Column title={FRIDAY_FINISH} className="column first-column">
            {returnItemsForColumn(FRIDAY_FINISH)}
          </Column>
        </div>
      </div>
    </DndProvider>
  )
}
export default WeeklyBuds
