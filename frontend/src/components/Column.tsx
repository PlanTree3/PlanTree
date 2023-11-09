import { useDrop } from 'react-dnd'
import { ITEM_TYPE, ColumnProps } from '@/types/DnDType'
import '@/styles/branch.scss'

const Column = ({ children, className, title }: ColumnProps) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: () => ({ name: title }),
  })
  return (
    <div ref={drop} className={className}>
      {children}
    </div>
  )
}

export default Column
