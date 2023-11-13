import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ItemPlacement } from '@/components'
import { getBranchData } from '@/stores/features/branchSlice.ts'

const WeeklyBudsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBranchData())
  })
  return <ItemPlacement />
}
export default WeeklyBudsPage
