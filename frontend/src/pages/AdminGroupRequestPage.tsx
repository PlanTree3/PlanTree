import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link, useParams, useLocation } from 'react-router-dom'
import './GroupPage.css'
import Button from '@/components/Button/Button'
import { groupJoinAccept, groupJoinRefuse, groupStudentsRequest } from '@/apis'

const AdminGroupRequestPage = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const groupName = location.state?.groupName || '';

  const [currentPage, setCurrentPage] = useState(1)
  const [studentsData, setStudentsData] = useState<any>(null)
  // const GroupsPerPage = 5

// 그룹 가입 수락 대기 리스트 조회
  const handleGroupRequestList = async () => {
    try {
      const response = await groupStudentsRequest(groupId)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  //그룹 가입 수락
  const handleGroupAccept = async () => {
    const data = { memberId: memberId }
    try {
      const response = await groupJoinAccept(data)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  //그룹 가입 거절
  const handleGroupRefuse = async () => {
    const data = { memberId: memberId }
    try {
      const response = await groupJoinRefuse(data)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    handleGroupRequestList()
  }, [])


  const handleNo = () => {
    console.log('nonono')
    handleGroupRefuse()
  }

  const handleYes = () => {
    console.log('yes!!')
    handleGroupAccept()
  }

  // const indexOfLastGroup = currentPage * GroupsPerPage
  // const indexOfFirstGroup = indexOfLastGroup - GroupsPerPage
  // const currentGroups = dummyData.data.groups.slice(
  //   indexOfFirstGroup,
  //   indexOfLastGroup,
  // )

  // const totalPages = Math.ceil(dummyData.data.groups.length / GroupsPerPage)

  // const pageNumbers = []
  // for (let i = 1; i <= totalPages; i += 1) {
  //   pageNumbers.push(i)
  // }

  // const changePage = (page: number) => {
  //   setCurrentPage(page)
  // }
  return (
    <div>
      <div className="flex flex-row">
        <div className="font-semibold text-2xl">
          {groupName}의 대기 학생 목록
        </div>
        <div className="ml-4">
          <Link to={`/adminGroupDetail/${groupId}`}>
            <Button label="그룹으로 돌아가기" className="gray" />
          </Link>
        </div>
      </div>
      <br />
      <div className="studentListBox">
        <div>
          <div className="groupRequest">
            <p className="groupInfo">1</p>
            <p className="groupInfo">신기정</p>
            <div className="flex justify-around">
              <Button
                className="primary"
                onClick={handleYes}
                label="수락하기"
              />
              <Button className="red" onClick={handleNo} label="거절하기" />
            </div>
          </div>
          <hr style={{ background: 'black', height: 1, border: 0 }} />
        </div>
      </div>
    </div>
  )
}

export default AdminGroupRequestPage
