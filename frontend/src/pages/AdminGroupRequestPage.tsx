import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import './GroupPage.css'
import Button from '@/components/Button/Button'

const AdminGroupRequestPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const GroupsPerPage = 5

  const handleNo = () => {
    console.log('nonono')
  }

  const handleYes = () => {
    console.log('yes!!')
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
          '현재 그룹 이름'의 대기 목록
        </div>
        <div className="ml-4">
          <Link to="/adminGroupDetail">
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
