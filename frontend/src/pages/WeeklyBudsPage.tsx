import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemPlacement } from '@/components'
import { getBranchData } from '@/stores/features/branchSlice.ts'
import { getMainData } from '@/stores/features/mainSlice.ts'
import { RootState } from '@/stores/store.ts'
import LoginCheck from '@/components/LoginCheck.tsx'

const WeeklyBudsPage = () => {
  const dispatch = useDispatch()
  const treeId = useSelector((state: RootState) => state.main.treeId)
  useEffect(() => {
    dispatch(getMainData())
    if (treeId) {
      dispatch(getBranchData())
    }
  }, [treeId])
  return <ItemPlacement />
}
export default LoginCheck(WeeklyBudsPage)
