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

  // 페이지 새로고침 시 경고 이벤트
  // useEffect(() => {
  //   // beforeunload 이벤트 핸들러
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault()
  //   }
  //   // 이벤트 리스너 등록
  //   window.addEventListener('beforeunload', handleBeforeUnload)
  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [])
  return <ItemPlacement />
}
export default LoginCheck(WeeklyBudsPage)
