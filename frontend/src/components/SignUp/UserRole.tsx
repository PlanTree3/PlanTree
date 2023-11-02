import { useState } from 'react'
import './SignUp.scss'

const UserRole = () => {
  const [inputRole, setInputRole] = useState<string>('')

  const rolesEG: string[] = ['STUDENT', 'PARENT', 'TEACHER']
  const rolesKO: string[] = ['학생', '학부모', '선생님']

  const setRole = (role: string) => {
    setInputRole(role)
  }
  return (
    <>
      <div>저는</div>
      {rolesKO.map((role: string, idx) => (
        <button className="roleButton" onClick={() => setRole(rolesEG[idx])}>
          {role}
        </button>
      ))}
      <div>입니다.</div>
    </>
  )
}

export default UserRole
