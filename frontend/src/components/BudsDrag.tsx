import { useDrag } from 'react-dnd';

const BudsDrag = ({ bud, moveBud }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BUD',
    item: bud,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveBud(item.budId, dropResult.dayOfWeek)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [bud])

  return (
    <div ref={drag} style={{
      opacity: isDragging ? 0.5 : 1,
      width: '200px',  // 너비 조정
      height: '50px',  // 높이 조정
      padding: '10px', // 내부 여백 추가
      margin: '5px',   // 외부 여백 추가
      border: '1px solid black', // 테두리 추가 (시각적 구분을 위해)
      boxSizing: 'border-box'
    }}>
      {bud.budName}
      {bud.dayOfWeek}
    </div>
  )
}

export default BudsDrag
