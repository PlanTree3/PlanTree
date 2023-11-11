import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom'
import chick from '../../public/chick.png'
import forest from '../../public/forest_tmp.png'
import './GroupPage.css'
import { userGroupList } from '@/apis'
// import StudentGroupPageResponse from '../types/GroupStudentType'

const StudentGroupPage = () => {

  const [studentData, setStudentData] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // 학생의 그룹, 둥지 정보 조회
  const handleGetList = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await userGroupList()
      console.log('Response:', response)
      console.log('Response:', response.data.data.group)
      setStudentData(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    handleGetList()
  }, [])
// 페이지
  const GroupsPerPage = 5

  const indexOfLastGroup = currentPage * GroupsPerPage
  const indexOfFirstGroup = indexOfLastGroup - GroupsPerPage
  const currentGroups = studentData?.groups?.slice(
    indexOfFirstGroup,
    indexOfLastGroup,
  )

  const totalPages = studentData?.groups
    ? Math.ceil(studentData.groups.length / GroupsPerPage)
    : 0

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {studentData && studentData.nest ? (
        // 둥지가 있는 경우
        <>
          <text>내 둥지 확인하기</text>
          <div className="box-border h-30 w-2/3 p-5 border-4 bg-amber-700 rounded-3xl">
            <div className="flex flex-row">
              <img className="chick flex flex-start" src={chick} alt="" />
              <div className="flex items-center text-white tracking-widest">
                여기는 그룹이름임
                <br />
                둥지장동지:
                <br />
                병아리 동지:
              </div>
            </div>
          </div>
          </>
          ) : (
        <div className="flex flex-row">
          <img className="chick" src={chick} alt="" />
          <text>아직 둥지가 없어요</text>
        </div>
      )}
      <text>내 그룹 확인하기</text>
      <div className="flex-container">
      {currentGroups?.map((group: any, index: number) => (
          <div>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <div key={index} className="groupItem">
              {/* <Link to="/studentGroupDetail"> */}
              <img className="forest" src={forest} alt="" />
              <p className="groupInfo">{group.groupName} </p>
              {/* </Link> */}
            </div>
          </div>
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

export default StudentGroupPage
