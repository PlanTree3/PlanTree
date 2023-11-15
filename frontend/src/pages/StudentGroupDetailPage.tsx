import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios';
import './GroupPage.scss'
import Button from '@/components/Button/Button'
import { groupDetail } from '@/apis'

const StudentGroupDetailPage = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [groupData, setGroupData] = useState<any>(null)

  const StudentsPerPage = 5

  //학생의 그룹 상세 조회
  const handleGetGroupDetail = async () => {
    try {
      const response = await groupDetail(groupId)
      console.log('학생 그룹 상제 조회 응답:', response)
      setGroupData(response.data)
    } catch (error) {
      console.error('학생 그룹 상제 조회 에러:', error)
    }
  }

  const indexOfLastGroup = currentPage * StudentsPerPage
  const indexOfFirstGroup = indexOfLastGroup - StudentsPerPage
  const currentStudents =
    groupData?.students?.slice(indexOfFirstGroup, indexOfLastGroup) || []

  const totalPages = Math.ceil(
    (groupData?.students?.length || 0) / StudentsPerPage,
  )

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    handleGetGroupDetail()
  }, [])
  
  return (
    <div>
      <Link to="/studentGroup">
        <div className="arrow">
          <div>목록으로 돌아가기</div>
        </div>
      </Link>
      <div className="font-semibold text-2xl">{groupData?.groupName}</div>
      <div className="flex flex-row">
        {/* <img src={Seal} alt="" /> */}
        <div className="groupLeader">
          <text>그룹장: {groupData?.teacherName}</text>
        </div>
      </div>
      {currentStudents.map((student: any, index: number) => (
        <div className="studentBox" key={index}>
          <div className="flex flex items-center">
            <text className="font-semibold text-l">{student.studentName}</text>
          </div>
          <div className="ms-6 flex-col flex justify-center ">
            <text>달성도</text>
            <text>
              {student.totalBudCount}/{student.completedBudCount}
            </text>
          </div>
        </div>
      ))}
      <div className="pagination">
        {pageNumbers.map((number, idx) => (
          <button key={idx} onClick={() => changePage(number)}>
            {number}
          </button>
        ))}
      </div>
      <Link to={`/newsLetter/${groupId}`}>
        <Button className="normal gray" label="가정통신문 보기" />
      </Link>
    </div>
  )
}

export default StudentGroupDetailPage
