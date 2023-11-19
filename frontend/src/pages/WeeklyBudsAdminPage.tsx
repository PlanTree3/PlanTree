import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemPlacementAdmin } from '@/components'
import { getBranchData } from '@/stores/features/branchSlice.ts'
import { getMainData } from '@/stores/features/mainSlice.ts'
import { RootState } from '@/stores/store.ts'
import LoginCheck from '@/components/LoginCheck.tsx'

const WeeklyBudsAdminPage = () => {
  const dispatch = useDispatch()
  // treeId를 클릭 시 props로 받거나 다른 방식으로 slice에 저장하면 그거 호출해서 이하 로직 진행하시면 됩니당
  const treeId = useSelector((state: RootState) => state.main.treeId)
  useEffect(() => {
    dispatch(getMainData())
    if (treeId) {
      dispatch(getBranchData())
    }
  }, [treeId])

  return <ItemPlacementAdmin />
}
export default LoginCheck(WeeklyBudsAdminPage)
