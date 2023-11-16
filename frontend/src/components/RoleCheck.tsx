import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/stores/store.ts'

const StudentCheck = (WrappedComponent: any) => {
  return function WithLoginCheck(props: any) {
    const role =
      useSelector((state: RootState) => state.user.userData?.role) === 'STUDENT'

    const navigate = useNavigate()

    useEffect(() => {
      if (!role) {
        navigate('/mypage')
      }
    }, [role, navigate])
    return role ? <WrappedComponent {...props} /> : null
  }
}
export { StudentCheck }

const TeacherCheck = (WrappedComponent: any) => {
  return function WithLoginCheck(props: any) {
    const role =
      useSelector((state: RootState) => state.user.userData?.role) === 'TEACHER'

    const navigate = useNavigate()

    useEffect(() => {
      if (!role) {
        navigate('/mypage')
      }
    }, [role, navigate])
    return role ? <WrappedComponent {...props} /> : null
  }
}
export { TeacherCheck }

const ParentCheck = (WrappedComponent: any) => {
  return function WithLoginCheck(props: any) {
    const role =
      useSelector((state: RootState) => state.user.userData?.role) === 'Parent'

    const navigate = useNavigate()

    useEffect(() => {
      if (!role) {
        navigate('/mypage')
      }
    }, [role, navigate])
    return role ? <WrappedComponent {...props} /> : null
  }
}
export { ParentCheck }
