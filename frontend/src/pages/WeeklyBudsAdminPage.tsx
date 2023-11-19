import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ItemPlacementAdmin } from '@/components'
import { getBranchData } from '@/stores/features/branchSlice.ts'
import LoginCheck from '@/components/LoginCheck.tsx'
import { storeIdName } from '@/stores/features/mainSlice.ts'

const WeeklyBudsAdminPage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  console.log(params)
  const treeId = params.studentId
  useEffect(() => {
    const data = {
      treeId,
      treeName: '연재연재',
    }
    console.log(data)
    dispatch(storeIdName(data))
    if (data) {
      dispatch(getBranchData())
    }
  }, [treeId])

  return <ItemPlacementAdmin />
}
export default LoginCheck(WeeklyBudsAdminPage)
