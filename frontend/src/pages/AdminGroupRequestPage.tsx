import { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link, useParams, useLocation } from 'react-router-dom'
import './GroupPage.scss'
import Button from '@/components/Button/Button'
import { groupJoinAccept, groupJoinRefuse, groupStudentsRequest } from '@/apis'

const AdminGroupRequestPage = () => {
  const { groupId } = useParams()
  const location = useLocation()
  const groupName = location.state?.groupName || ''

  const [currentPage, setCurrentPage] = useState(1)
  const [studentsData, setStudentsData] = useState<any>(null)

  const studentsPerPage = 5
  const endIndex = currentPage * studentsPerPage
  const startIndex = endIndex - studentsPerPage
  const currentStudents =
    studentsData?.joinRequestList?.slice(startIndex, endIndex) || []

  const totalPages = studentsData
    ? Math.ceil(studentsData.length / studentsPerPage)
    : 0

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  // 그룹 가입 수락 대기 리스트 조회
  const handleGroupRequestList = async () => {
    try {
      const response = await groupStudentsRequest(groupId)
      console.log('Response:', response)
      // setStudentsData(response.data.joinRequestList)
      setStudentsData(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  //그룹 가입 수락
  const handleGroupAccept = async (studentId: string) => {
    const data = { memberId: studentId }
    try {
      const response = await groupJoinAccept(groupId, data)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  //그룹 가입 거절
  const handleGroupRefuse = async (studentId: string) => {
    const data = { memberId: studentId }
    try {
      const response = await groupJoinRefuse(groupId, data)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    handleGroupRequestList()
  }, [])

  const handleNo = (studentId: string) => {
    console.log('nonono')
    handleGroupRefuse(studentId)
  }

  const handleYes = (studentId: string) => {
    console.log('yes!!')
    handleGroupAccept(studentId)
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="font-semibold text-2xl">
          {groupName}의 대기 학생 목록
        </div>
        <div className="ml-4">
          <Link to={`/adminGroupDetail/${groupId}`} state={{ groupName }}>
            <Button label="그룹으로 돌아가기" className="gray normal" />
          </Link>
        </div>
      </div>
      <br />
      <div className="studentListBox">
        {currentStudents.length > 0 ? (
          currentStudents.map((student: any, index: number) => (
            <div>
              <div className="groupRequest">
                <p className="groupInfo">{index + 1 + (currentPage - 1) * 5}</p>
                <p className="groupInfo">{student.studentName}</p>
                <div className="flex justify-around">
                  <Button
                    className="primary"
                    onClick={() => handleYes(student.studentId)}
                    label="수락하기"
                  />
                  <Button
                    className="red"
                    onClick={() => handleNo(student.studentId)}
                    label="거절하기"
                  />
                </div>
              </div>
              <hr style={{ background: 'black', height: 1, border: 0 }} />
            </div>
          ))
        ) : (
          <p>현재 수락 대기중인 학생이 없습니다.</p>
        )}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => changePage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminGroupRequestPage
