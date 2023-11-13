import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// import axios from 'axios';
import './GroupPage.css'
import Seal from '../../public/Seal.png'
// import yeji1 from '../../public/yeji1.png'
// import gijeong1 from '../../public/gijeong1.png'
import { groupDetail } from '@/apis'

const StudentGroupDetailPage = () => {
  const { groupId } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [groupData, setGroupData] = useState<any>(null)

  const StudentsPerPage = 5

  //학생의 그룹 상세 조회
  const handleGetGroupDetail = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await groupDetail
      console.log('Response:', response)
      setGroupData(response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    handleGetGroupDetail()
  }, [])

  const indexOfLastGroup = currentPage * StudentsPerPage
  const indexOfFirstGroup = indexOfLastGroup - StudentsPerPage
  const currentStudents = groupData.students.slice(
    indexOfFirstGroup,
    indexOfLastGroup,
  )

  const totalPages = Math.ceil(groupData.students.length / StudentsPerPage)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <Link to="/studentGroup">
        <div className="arrow">
          <div className="pt-6">목록으로 돌아가기</div>
        </div>
      </Link>
      <div>{groupData.groupName}</div>
      <div className="flex flex-row">
        <img className="h-40" src={Seal} alt="" />
        <div className="groupLeader">
          <text>그룹장: {groupData.teacherName}</text>
        </div>
      </div>
      <div className="studentBox">
      {currentStudents.map((student: any) => (
        <>
        <div className="flex flex items-center">
          <text>{student.studentName}</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>{student.totalBudCount}/{student.completedBudCount}</text>
        </div>
        </>
        ))}
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

export default StudentGroupDetailPage
