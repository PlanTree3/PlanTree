import { useState, useEffect } from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom'
import chick from '../../public/chick.png'
import forest from '../../public/forest_tmp.png'
import './GroupPage.scss'
import { userGroupList } from '@/apis'
import { LoginCheck, StudentCheck } from '@/components'
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
      console.log('Response:', response.data.data)
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
        <div>
          {/* <text className="font-semibold text-2xl"> */}
          <text className="font-semibold text-2xl">내 둥지 확인하기</text>
          {/* <div className="box-border h-30 w-3/4 p-5 border-4 bg-amber-700 rounded-3xl"> */}
          <div>
            <div className="student-group-nest-area">
              <div className="student-group-nest-area-image-container">
                <img src={chick} alt="" />
              </div>
              <div className="student-group-nest-area-text-container">
                <title>{studentData.nest.nestName}</title>
                <div className="student-group-nest-area-text">
                  <title>둥지장</title>
                  {studentData.nest.parents.map((parent: any) => (
                    <text>{parent}</text>
                  ))}
                </div>
                <div className="student-group-nest-area-text">
                  <title>둥지원</title>
                  {studentData.nest.children.map((child: any) => (
                    <text>{child}</text>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="student-group-nest-area">
          <div className="student-group-nest-area-image-container">
            <img src={chick} alt="" />
          </div>
          <div className="student-group-nest-area-text-container">
            <title>아직 둥지가 없어요</title>
            <text>보호자와 연결해서 둥지를 만들어 보아요!</text>
          </div>
        </div>
      )}
      <br />
      {/* <text className="font-semibold text-2xl"> */}
      <text className="font-semibold text-2xl">내 그룹 확인하기</text>
      <div className="flex-container">
        {currentGroups?.map((group: any, index: number) => (
          <div key={index}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <div className="groupItem">
              <Link to={`/studentGroupDetail/${group.groupId}`}>
                <img className="forest" src={forest} alt="" />
                <p className="groupInfo">{group.groupName} </p>
              </Link>
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

export default StudentCheck(LoginCheck(StudentGroupPage))
